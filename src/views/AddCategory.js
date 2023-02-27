import React, { useContext, useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { CategoriesContext } from 'providers/CategoriesProvider';
import FormButton from 'components/atoms/FormButton/FormButton';
import FormField from 'components/molecules/FormField/FormField';
import IconFormField from 'components/molecules/IconFormField/IconFormField';
import DownshiftSelect from 'components/organisms/DownshiftSelect/DownshiftSelect';

import { StyledInputColor } from 'components/atoms/InputColor/InputColor.styles';
import { StyledForm } from 'components/organisms/StyledForm/StyledForm.styles';
import { Wrapper } from 'views/AddCategory.styles';

const AddCategory = ({ activeType, handleClose }) => {
  const context = useContext(CategoriesContext);

  const { dispatchError } = useError();

  const initialState = context.selectedCategory
    ? {
        name: context.selectedCategory.name,
        icon: context.selectedCategory.icon,
        type: context.selectedCategory.type,
        color: context.selectedCategory.color,
      }
    : { ...context.initialCategoryState, type: activeType };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? { [e.target.name]: e.target.checked } : e.target.type === 'radio' ? { [e.target.name]: e.target.id } : { [e.target.name]: e.target.value };
    setState({
      ...state,
      ...value,
    });
  };

  const editCategory = async (editedCategory) => {
    const categoryRef = doc(db, 'categories', context.selectedCategory.id);
    await updateDoc(categoryRef, editedCategory, { merge: true });
  };

  const addCategory = async (category) => {
    await addDoc(collection(db, 'categories'), category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = {
      name: state.name,
      icon: state.icon,
      type: state.type,
      color: state.color,
    };

    const isEdit = context.selectedCategory ? true : false;

    const countError = context.validFields(category, isEdit);

    if (countError <= 0) {
      try {
        if (isEdit) {
          editCategory(category);
        } else {
          addCategory(category);
        }
      } catch (e) {
        let errorMsg;
        if (isEdit) {
          errorMsg = 'Not category edited';
        } else {
          errorMsg = 'Not category added';
        }

        dispatchError(errorMsg);
      }

      context.setErrors({});
      handleClose();
    }
  };

  return (
    <Wrapper>
      <h1>{context.selectedCategory ? 'Edit category' : 'Add category'}</h1>
      <StyledForm onSubmit={handleSubmit}>
        <DownshiftSelect ctx="type" changeState={setState} labelTxt="Type" initial={state.type} view="category" />
        <FormField onChange={handleChange} value={state.name} label="Name" name="name" id="name" errorMsg={context.errors.name} />
        <StyledInputColor onChange={handleChange} value={state.color} label="Color" name="color" id="color" type="color" errorMsg={context.errors.color} />
        <IconFormField stateIcon={state.icon} stateColor={state.color} handleChange={handleChange} type="categories" shape="circle" errorMsg={context.errors.icon} />
        <FormButton label={context.selectedCategory ? 'Edit' : 'Add'} />
      </StyledForm>
    </Wrapper>
  );
};

export default AddCategory;
