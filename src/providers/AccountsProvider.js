import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';

import { TransactionsContext } from 'providers/TransactionsProvider';
import { theme } from 'assets/styles/theme';

const initialAccountState = {
  name: '',
  icon: '',
  balance: '',
  isFavourite: false,
  color: theme.colors.black,
};

const rulesToFields = {
  name: { rules: { required: true }, type: 'text' },
  balance: { rules: { required: true }, type: 'number' },
  icon: { rules: { required: true }, type: 'radio' },
  color: { rules: { required: true }, type: 'color' },
  isFavourite: { rules: { required: false }, type: 'checkbox' },
  initialBalance: { rules: { required: false }, type: 'number' },
};

export const AccountsContext = createContext({
  accounts: [],
  selectedAccount: null,
  setSelectedAccounts: () => {},
  setAccounts: () => {},
  initialAccountState,
  rulesToFields: {},
  errors: {},
  setErrors: () => {},
  validFields: () => {},
});

const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccounts] = useState(null);
  const [errors, setErrors] = useState({});

  const contextTransactions = useContext(TransactionsContext);

  const fetchAccounts = async () => {
    const querySnapshotAccounts = query(collection(db, 'accounts'));
    const unsub = onSnapshot(querySnapshotAccounts, (newTransactions) => {
      const snapshotAccounts = newTransactions.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      const newAccountsData = calculateAccountsBalance(snapshotAccounts).sort((a, b) => a.order - b.order);

      setAccounts(newAccountsData);
    });

    return () => unsub();
  };

  const calculateAccountsBalance = (acc) => {
    const newAccounts = acc.map((account) => {
      const transactionsWithoutTransfers = contextTransactions.originalDataFromFirebase.filter((odff) => odff.account === account.id && odff.type !== 'transfer');
      const transfers = contextTransactions.originalDataFromFirebase.filter((odff) => odff.type === 'transfer' && (odff.account === account.id || odff.toAccount === account.id));

      let transfersBalance = 0;
      if (transfers.length) {
        transfers.forEach((transfer) => {
          if (account.id === transfer.account && account.id !== transfer.toAccount) {
            transfersBalance += -transfer.amount;
          } else if (account.id === transfer.toAccount && account.id !== transfer.account) {
            transfersBalance += transfer.amount;
          }
        });
      }

      const newBalance = +account.initialBalance + transactionsWithoutTransfers.reduce((transaction, item) => transaction + item.amount, 0) + transfersBalance;

      return { ...account, balance: newBalance };
    });

    return newAccounts;
  };

  const validFields = (fields, isEdit = false) => {
    let countError = 0;

    Object.keys(fields).forEach((field) => {
      Object.entries(rulesToFields[field].rules).forEach((rule) => {
        if (rule[0] === 'required' && rule[1] && !fields[field]) {
          let msg = 'You need to ';
          if (rulesToFields[field].type === 'select' || rulesToFields[field].type === 'radio') {
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

    if (!isEdit && accounts.find((account) => account.name === fields.name)) {
      setErrors((prevValue) => ({ ...prevValue, name: 'Account name already exists' }));

      countError++;
    } else if (!countError) {
      setErrors((prevValue) => ({ ...prevValue, name: null }));
    }

    return countError;
  };

  useEffect(() => {
    fetchAccounts();
  }, [contextTransactions]);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        selectedAccount,
        setSelectedAccounts,
        setAccounts,
        initialAccountState,
        rulesToFields,
        errors,
        setErrors,
        validFields,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
