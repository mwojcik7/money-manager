import React, { useContext, useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { AccountsContext } from 'providers/AccountsProvider';
import FormButton from 'components/atoms/FormButton/FormButton';
import IconBox from 'components/atoms/IconBox/IconBox';
import FormField from 'components/molecules/FormField/FormField';
import IconFormField from 'components/molecules/IconFormField/IconFormField';

import { StyledInputColor } from 'components/atoms/InputColor/InputColor.styles';
import { StyledInputRadioOrCheckbox } from 'components/atoms/StyledInputRadioOrCheckbox/StyledInputRadioOrCheckbox.styles';
import { StyledForm } from 'components/organisms/StyledForm/StyledForm.styles';
import { Wrapper } from 'views/AddAccounts.styles';

const AddAccount = ({ handleClose }) => {
  const context = useContext(AccountsContext);

  const { dispatchError } = useError();

  const initialState = context.selectedAccount
    ? {
        name: context.selectedAccount.name,
        icon: context.selectedAccount.icon,
        balance: context.selectedAccount.balance,
        isFavourite: context.selectedAccount.isFavourite,
        color: context.selectedAccount.color,
        initialBalance: context.selectedAccount.initialBalance,
      }
    : context.initialAccountState;

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? { [e.target.name]: e.target.checked } : e.target.type === 'radio' ? { [e.target.name]: e.target.id } : { [e.target.name]: e.target.value };
    setState({
      ...state,
      ...value,
    });
  };

  const editAccount = async (editedAccount) => {
    const accountsRef = doc(db, 'accounts', context.selectedAccount.id);
    await updateDoc(accountsRef, editedAccount, { merge: true });
  };

  const addAccount = async (account) => {
    account.initialBalance = account.balance;
    account.order = context.accounts.length + 1;
    await addDoc(collection(db, 'accounts'), account);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = {
      name: state.name,
      icon: state.icon,
      balance: +state.balance,
      isFavourite: state.isFavourite,
      color: state.color,
      initialBalance: initialState.initialBalance + +state.balance - initialState.balance,
    };

    const isEdit = context.selectedAccount ? true : false;

    const countError = context.validFields(account, isEdit);

    if (countError <= 0) {
      try {
        if (isEdit) {
          editAccount(account);
        } else {
          addAccount(account);
        }
      } catch (e) {
        let errorMsg;
        if (isEdit) {
          errorMsg = 'Not account edited';
        } else {
          errorMsg = 'Not account added';
        }

        dispatchError(errorMsg);
      }

      context.setErrors({});
      handleClose();
    }
  };

  return (
    <Wrapper>
      <h1>{context.selectedAccount ? 'Edit account' : 'Add account'}</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInputRadioOrCheckbox type="checkbox" name="isFavourite" id="isFavourite" defaultChecked={state.isFavourite} onChange={handleChange} />
        <IconBox icon={state.isFavourite ? 'faStarSolid' : 'faStar'} as="label" htmlFor="isFavourite" title="Favourite" hasHover={true} />
        <FormField onChange={handleChange} value={state.name} label="Name" name="name" id="name" errorMsg={context.errors.name} />
        <FormField onChange={handleChange} value={state.balance} label="Balance" name="balance" id="balance" type="number" errorMsg={context.errors.balance} />
        <IconFormField stateIcon={state.icon} stateColor={state.color} handleChange={handleChange} type="accounts" errorMsg={context.errors.icon} />
        <StyledInputColor onChange={handleChange} value={state.color} label="Color" name="color" id="color" type="color" />
        <FormButton label={context.selectedAccount ? 'Edit' : 'Add'} />
      </StyledForm>
    </Wrapper>
  );
};

export default AddAccount;
