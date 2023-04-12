import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, Unsubscribe } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { days } from 'helpers/days';
import { months } from 'helpers/months';

export type TypeType = 'income' | 'expense' | 'transfer' | 'other' | null;

interface TransactionsGroupByDateInterface {
  [index: string]: {
    transactions: TransactionWithIdInterface[],
    totalBalanceForDay: number,
    dateInfo: DateInfoInterface,
  };
}

export interface TransactionsInterface {
  transactions: TransactionWithIdInterface[],
  totalBalanceForDay: number,
  dateInfo: DateInfoInterface,
}

export interface TransactionWithIdInterface extends TransactionWithoutIdInterface {
  id: string;
}

export interface TransactionWithoutIdInterface {
  account: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  toAccount: string | null;
  type: TypeType;
}

interface DateInfoInterface {
  dayOfWeek: string;
  monthName: string;
  day: string;
  month: string;
  year: string;
  dateString: string;
}

interface TransactionRulesInterface {
  [index: string]: {
    rules: { required: boolean },
    type: string,
  };
}

interface ErrorInterface {
  [index: string]: string | null;
}

interface ContextValue {
  transactions: [string, TransactionsInterface][];
  selectedTransaction: TransactionWithIdInterface | null;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<TransactionWithIdInterface | null>>;
  originalDataFromFirebase: TransactionWithIdInterface[];
  initialTransactionState: TransactionWithoutIdInterface;
  rulesToFields: TransactionRulesInterface;
  errors: ErrorInterface;
  setErrors: React.Dispatch<React.SetStateAction<ErrorInterface>>;
  validFields: (fields: { [index: string]: string | number | TypeType }) => number;
  getTransactionsByMonthAndYear: (selectedMonth: number, selectedYear: number) => [string, TransactionsInterface][];
}

const initialTransactionState: TransactionWithoutIdInterface = {
  account: '',
  category: '',
  date: '',
  description: '',
  type: 'expense',
  amount: 0,
  toAccount: null,
};

const rulesToFields: TransactionRulesInterface = {
  account: { rules: { required: true }, type: 'select' },
  category: { rules: { required: true }, type: 'select' },
  date: { rules: { required: true }, type: 'date' },
  description: { rules: { required: true }, type: 'text' },
  type: { rules: { required: true }, type: 'select' },
  amount: { rules: { required: true }, type: 'number' },
  toAccount: { rules: { required: false }, type: 'select' },
};

export const TransactionsContext = createContext<ContextValue | null>(null);

const getDateInfo = (date: string): DateInfoInterface => {
  const newDate: Date = new Date(date);
  const monthTmp: number = newDate.getMonth() + 1;
  const month: string = monthTmp < 10 ? `0${monthTmp}` : String(monthTmp);
  const dayTmp: number = newDate.getDate();
  const day: string = dayTmp < 10 ? `0${dayTmp}` : String(dayTmp);
  const year = String(newDate.getFullYear());

  const monthName: string = months[monthTmp - 1];
  const dayOfWeek: string = days[newDate.getDay()];

  return { dayOfWeek, monthName, day, month, year, dateString: date };
};

const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
  const [transactions, setTransactions] = useState<[string, TransactionsInterface][]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionWithIdInterface | null>(null);
  const [originalDataFromFirebase, setOriginalDataFromFirebase] = useState<TransactionWithIdInterface[]>([]);
  const [errors, setErrors] = useState<ErrorInterface>({});

  const fetchTransactions = (): Unsubscribe => {
    const querySnapshotTransactions = query(collection(db, 'transactions'));
    const unsub = onSnapshot(querySnapshotTransactions, (newTransactions) => {
      const snapshotTransactions: TransactionWithIdInterface[] = newTransactions.docs.map((item) => {
        // eslint-disable-next-line prettier/prettier
        return { id: item.id, ...item.data() } as TransactionWithIdInterface;
      });

      setOriginalDataFromFirebase(snapshotTransactions);

      const transactionsGroupByDate: TransactionsGroupByDateInterface = {};

      snapshotTransactions.forEach((transaction: TransactionWithIdInterface) => {
        const balanceToAdd: number = transaction.type !== 'transfer' ? transaction.amount : 0;

        if (!transactionsGroupByDate[transaction.date]) {
          transactionsGroupByDate[transaction.date] = {
            transactions: [],
            totalBalanceForDay: balanceToAdd,
            dateInfo: getDateInfo(transaction.date),
          };
        } else {
          transactionsGroupByDate[transaction.date].totalBalanceForDay += balanceToAdd;
        }
        // transactionsGroupByDate[transaction.date].dateInfo = getDateInfo(transaction.date);
        transactionsGroupByDate[transaction.date].transactions.push(transaction);
      });

      const transactionsSortedByDate: [string, TransactionsInterface][] = Object.entries(transactionsGroupByDate).sort((a, b) => b[0].localeCompare(a[0]));

      setTransactions(transactionsSortedByDate);
    });

    return unsub;
  };

  const validFields = (fields: { [index: string]: string | number| TypeType }): number => {
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

  const getTransactionsByMonthAndYear = (selectedMonth: number, selectedYear: number): [string, TransactionsInterface][] => {
    return transactions.filter((transaction) => +transaction[0].substring(5, 7) === selectedMonth + 1 && +transaction[0].substring(0, 4) === selectedYear);
  };

  useEffect(() => {
    const unsub: Unsubscribe = fetchTransactions();

    return () => unsub();
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
        getTransactionsByMonthAndYear,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const contextTransactions = useContext(TransactionsContext);

  if (!contextTransactions) {
    throw new Error('useTransactionsProvider has to be used within <TransactionsContext.Provider>');
  }

  return contextTransactions;
};

export default TransactionsProvider;
