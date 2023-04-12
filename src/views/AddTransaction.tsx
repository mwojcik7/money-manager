import { useState, useCallback } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { TransactionWithoutIdInterface, TypeType, useTransactionsContext } from 'providers/TransactionsProvider';
import FormButton from 'components/atoms/FormButton/FormButton';
import FormField from 'components/molecules/FormField/FormField';
import DownshiftSelect from 'components/organisms/DownshiftSelect/DownshiftSelect';

import { StyledForm } from 'components/organisms/StyledForm/StyledForm.styles';
import { Wrapper } from 'views/AddTransactions.styles';

interface PropsInterface {
  handleClose: () => void;
  initialDate: string;
}

const AddTransaction = ({ handleClose, initialDate = new Date().toISOString().split('T')[0] }: PropsInterface) => {
  const contextTransactions = useTransactionsContext();

  const { dispatchError } = useError();

  const initialState: TransactionWithoutIdInterface = contextTransactions.selectedTransaction
    ? {
        account: contextTransactions.selectedTransaction.account,
        category: contextTransactions.selectedTransaction.category,
        date: contextTransactions.selectedTransaction.date,
        description: contextTransactions.selectedTransaction.description,
        type: contextTransactions.selectedTransaction.type,
        amount: Math.abs(contextTransactions.selectedTransaction.amount),
        toAccount: contextTransactions.selectedTransaction.toAccount,
      }
    : { ...contextTransactions.initialTransactionState, date: initialDate };

  const [state, setState] = useState<TransactionWithoutIdInterface>(initialState);

  const changeState = useCallback((args: object): void => {
    setState((prevState) => ({ ...prevState, ...args }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: { [index: string]: string | boolean } = e.target.type === 'checkbox' ? { [e.target.name]: e.target.checked } : { [e.target.name]: e.target.value };
    setState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const editTransaction = async (editedTransaction: { [index: string]: string | number | TypeType }) => {
    if (contextTransactions.selectedTransaction) {
      const transactionRef = doc(db, 'transactions', contextTransactions.selectedTransaction.id);
      await updateDoc(transactionRef, editedTransaction);
    }
  };

  const addTransaction = async (transaction: { [index: string]: string | number | TypeType }) => {
    await addDoc(collection(db, 'transactions'), transaction);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const amount: number = state.type === 'expense' ? -state.amount : +state.amount;

    const transaction: { [index: string]: string | number | null } = {
      account: state.account,
      category: state.category,
      date: state.date,
      description: state.description,
      type: state.type,
      amount: amount,
      toAccount: state.toAccount,
    };

    const countError: number = contextTransactions.validFields(transaction);

    if (countError <= 0) {
      try {
        if (contextTransactions.selectedTransaction) {
          editTransaction(transaction);
        } else {
          addTransaction(transaction);
        }
      } catch (e) {
        let errorMsg: string;
        if (contextTransactions.selectedTransaction) {
          errorMsg = 'Not transaction edited';
        } else {
          errorMsg = 'Not transaction added';
        }

        dispatchError(errorMsg);
      }

      contextTransactions.setErrors({});
      handleClose();
    }
  };

  return (
    <Wrapper>
      <h1>{contextTransactions.selectedTransaction ? 'Edit transaction' : 'Add transaction'}</h1>
      <StyledForm onSubmit={handleSubmit}>
        <DownshiftSelect ctx="type" changeState={changeState} labelTxt="Type" initial={state.type} />
        <DownshiftSelect ctx="accounts" changeState={changeState} labelTxt={state.type === 'transfer' ? 'From account' : 'Account'} initial={state.account} selectedType={state.type} />
        {state.type && state.type !== 'transfer' ? <DownshiftSelect ctx="categories" changeState={changeState} selectedElement={state.type} labelTxt="Category" initial={state.category} /> : null}
        {state.account && state.type === 'transfer' ? <DownshiftSelect ctx="accounts" stateField="toAccount" changeState={changeState} selectedElement={state.account} labelTxt="To account" initial={state.toAccount} /> : null}
        <FormField onChange={handleChange} value={state.date} label="Date" name="date" id="date" type="date" errorMsg={contextTransactions.errors.date} />
        <FormField onChange={handleChange} value={state.description} label="Description" name="description" id="description" errorMsg={contextTransactions.errors.description} />
        <FormField onChange={handleChange} value={state.amount} label="Amount" name="amount" id="amount" type="number" min="0" step="0.01" placeholder={0} errorMsg={contextTransactions.errors.amount} />
        <FormButton label={contextTransactions.selectedTransaction ? 'Edit' : 'Add'} />
      </StyledForm>
    </Wrapper>
  );
};

export default AddTransaction;
