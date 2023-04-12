import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, Unsubscribe } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { theme } from 'assets/styles/theme';

import { TransactionWithIdInterface, useTransactionsContext } from 'providers/TransactionsProvider';

export interface AccountWithoutIdInterface {
  name: string;
  icon: string;
  isFavourite: boolean;
  color: string;
  initialBalance: number;
  balance: number;
}

export interface AccountWithIdInterface extends AccountWithoutIdInterface {
  id: string;
  order: number;
}

interface ErrorInterface {
  [index: string]: string | null;
}

interface AccountRulesInterface {
  [index: string]: {
    rules: { required: boolean },
    type: string,
  };
}

interface ContextValue {
  accounts: AccountWithIdInterface[];
  selectedAccount: AccountWithIdInterface | null;
  setSelectedAccounts: React.Dispatch<React.SetStateAction<AccountWithIdInterface | null>>;
  setAccounts: React.Dispatch<React.SetStateAction<AccountWithIdInterface[]>>;
  initialAccountState: AccountWithoutIdInterface;
  rulesToFields: AccountRulesInterface;
  errors: ErrorInterface | null;
  setErrors: React.Dispatch<React.SetStateAction<ErrorInterface>>;
  validFields: (fields: { [index: string]: string | number | boolean }, isEdit: boolean) => number;
}

const rulesToFields: AccountRulesInterface = {
  name: { rules: { required: true }, type: 'text' },
  balance: { rules: { required: true }, type: 'number' },
  icon: { rules: { required: true }, type: 'radio' },
  color: { rules: { required: true }, type: 'color' },
  isFavourite: { rules: { required: false }, type: 'checkbox' },
  initialBalance: { rules: { required: false }, type: 'number' },
};

const initialAccountState: AccountWithoutIdInterface = {
  name: '',
  icon: '',
  balance: 0,
  isFavourite: false,
  color: theme.colors.black,
  initialBalance: 0,
};

const AccountsContext = createContext<ContextValue | null>(null);

const AccountsProvider = ({ children }: React.PropsWithChildren) => {
  const [accounts, setAccounts] = useState<AccountWithIdInterface[]>([]);
  const [selectedAccount, setSelectedAccounts] = useState<AccountWithIdInterface | null>(null);
  const [errors, setErrors] = useState<ErrorInterface>({});

  const contextTransactions = useTransactionsContext();

  const validFields = (fields: { [index: string]: string | number | boolean }, isEdit = false): number => {
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

    if (!isEdit && accounts.find((account: AccountWithIdInterface) => account.name === fields.name)) {
      setErrors((prevValue) => ({ ...prevValue, name: 'Account name already exists' }));

      countError++;
    } else if (!countError) {
      setErrors((prevValue) => ({ ...prevValue, name: null }));
    }

    return countError;
  };

  useEffect(() => {
    const calculateAccountsBalance = (acc: AccountWithIdInterface[]): AccountWithIdInterface[] => {
      const newAccounts: AccountWithIdInterface[] = acc.map((account) => {
        const transactionsWithoutTransfers: TransactionWithIdInterface[] = contextTransactions.originalDataFromFirebase.filter((odff: TransactionWithIdInterface) => odff.account === account.id && odff.type !== 'transfer');
        const transfers: TransactionWithIdInterface[] = contextTransactions.originalDataFromFirebase.filter((odff: TransactionWithIdInterface) => odff.type === 'transfer' && (odff.account === account.id || odff.toAccount === account.id));

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

        const newBalance: number = account.initialBalance + transactionsWithoutTransfers.reduce((transaction, item) => transaction + item.amount, 0) + transfersBalance;

        return { ...account, balance: newBalance };
      });

      return newAccounts;
    };

    
    const fetchAccounts = (): Unsubscribe => {
      const querySnapshotAccounts = query(collection(db, 'accounts'));
      const unsub: Unsubscribe = onSnapshot(querySnapshotAccounts, (newTransactions) => {
        const snapshotAccounts: AccountWithIdInterface[] = newTransactions.docs.map((item) => {
          // eslint-disable-next-line prettier/prettier
          return { id: item.id, ...item.data() } as AccountWithIdInterface;
        });

        const newAccountsData: AccountWithIdInterface[] = calculateAccountsBalance(snapshotAccounts).sort((a, b) => a.order - b.order);

        setAccounts(newAccountsData);
      });

      return unsub;
    };

    const unsub: Unsubscribe = fetchAccounts();

    return () => unsub();
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

export const useAccountsContext = () => {
  const contextAccounts = useContext(AccountsContext);

  if (!contextAccounts) {
    throw new Error('useAccountsProvider has to be used within <AccountsContext.Provider>');
  }

  return contextAccounts;
};

export default AccountsProvider;
