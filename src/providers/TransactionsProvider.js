import React, { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { days } from 'helpers/days';
import { months } from 'helpers/months';

const initialTransactionState = {
  account: '',
  category: '',
  date: '',
  description: '',
  type: 'expense',
  amount: '',
  toAccount: null,
};

const rulesToFields = {
  account: { rules: { required: true }, type: 'select' },
  category: { rules: { required: true }, type: 'select' },
  date: { rules: { required: true }, type: 'date' },
  description: { rules: { required: true }, type: 'text' },
  type: { rules: { required: true }, type: 'select' },
  amount: { rules: { required: true }, type: 'number' },
  toAccount: { rules: { required: false }, type: 'select' },
};

export const TransactionsContext = createContext({
  transactions: [],
  selectedTransaction: null,
  setSelectedTransaction: () => {},
  originalDataFromFirebase: [],
  initialTransactionState,
  rulesToFields: {},
  errors: {},
  setErrors: () => {},
  validFields: () => {},
});

const getDateInfo = (date) => {
  const newDate = new Date(date);
  const monthTmp = newDate.getMonth() + 1;
  const month = monthTmp < 10 ? `0${monthTmp}` : monthTmp;
  const dayTmp = newDate.getDate();
  const day = dayTmp < 10 ? `0${dayTmp}` : dayTmp;
  const year = newDate.getFullYear();

  const monthName = months[monthTmp - 1];
  const dayOfWeek = days[newDate.getDay()];

  return { dayOfWeek, monthName, day, month, year, dateString: date };
};

const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [originalDataFromFirebase, setOriginalDataFromFirebase] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchTransactions = async () => {
    const querySnapshotTransactions = query(collection(db, 'transactions'));
    const unsub = onSnapshot(querySnapshotTransactions, (newTransactions) => {
      const snapshotTransactions = newTransactions.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      setOriginalDataFromFirebase(snapshotTransactions);

      const transactionsGroupByDate = snapshotTransactions.reduce((groups, transaction) => {
        if (!groups[transaction.date]) {
          groups[transaction.date] = {};
          groups[transaction.date]['transactions'] = [];
          groups[transaction.date]['totalBalanceForDay'] = 0;
          if (transaction.type !== 'transfer') {
            groups[transaction.date]['totalBalanceForDay'] = transaction.amount;
          }
        } else {
          if (transaction.type !== 'transfer') {
            groups[transaction.date]['totalBalanceForDay'] += transaction.amount;
          }
        }
        groups[transaction.date]['dateInfo'] = getDateInfo(transaction.date);
        groups[transaction.date]['transactions'].push(transaction);
        return groups;
      }, {});

      const transactionsByDate = Object.keys(transactionsGroupByDate)
        .sort((a, b) => b.localeCompare(a))
        .reduce((obj, key) => {
          obj[key] = transactionsGroupByDate[key];
          return obj;
        }, {});

      setTransactions(transactionsByDate);
    });

    return () => unsub();
  };

  const validFields = (fields) => {
    let countError = 0;
    Object.keys(fields).forEach((field) => {
      Object.entries(rulesToFields[field].rules).forEach((rule) => {
        if (rule[0] === 'required' && rule[1] && !fields[field]) {
          let msg = 'You need to ';
          if (rulesToFields[field].type === 'select') {
            msg += 'select any option';
          } else {
            msg += `complete the ${field} field`;
          }
          setErrors((prevValue) => {
            prevValue[field] = msg;
            return { ...prevValue };
          });

          countError++;
        } else {
          setErrors((prevValue) => {
            prevValue[field] = null;
            return { ...prevValue };
          });
        }
      });
    });

    return countError;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        selectedTransaction,
        setSelectedTransaction,
        originalDataFromFirebase,
        initialTransactionState,
        rulesToFields,
        errors,
        setErrors,
        validFields,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
