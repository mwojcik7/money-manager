import { useState, useCallback } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { CategoryWithoutIdInterface, TypeType, useCategoriesContext } from 'providers/CategoriesProvider';
import FormButton from 'components/atoms/FormButton/FormButton';
import FormField from 'components/molecules/FormField/FormField';
import IconFormField from 'components/molecules/IconFormField/IconFormField';
import DownshiftSelect from 'components/organisms/DownshiftSelect/DownshiftSelect';

import { StyledInputColor } from 'components/atoms/InputColor/InputColor.styles';
import { StyledForm } from 'components/organisms/StyledForm/StyledForm.styles';
import { Wrapper } from 'components/organisms/AddCategory/AddCategory.styles';

interface PropsInterface {
  activeType: TypeType;
  handleClose: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddCategory = ({ activeType, handleClose }: PropsInterface) => {
  const context = useCategoriesContext();

  const { dispatchError } = useError();

  const initialState: CategoryWithoutIdInterface = context.selectedCategory
    ? {
        name: context.selectedCategory.name,
        icon: context.selectedCategory.icon,
        type: context.selectedCategory.type,
        color: context.selectedCategory.color,
      }
    : { ...context.initialCategoryState, type: activeType };

  const [state, setState] = useState<CategoryWithoutIdInterface>(initialState);

  const changeState = useCallback((args: object) => {
    setState((prevState) => ({ ...prevState, ...args }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.type === 'checkbox' ? { [e.target.name]: e.target.checked } : e.target.type === 'radio' ? { [e.target.name]: e.target.id } : { [e.target.name]: e.target.value };
    setState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const editCategory = async (editedCategory: { [index: string]: string | number | boolean | TypeType }): Promise<void> => {
    if (context.selectedCategory) {
      const categoryRef = doc(db, 'categories', context.selectedCategory.id);
      await updateDoc(categoryRef, editedCategory);
    }
  };

  const addCategory = async (category: { [index: string]: string | number | boolean | TypeType }): Promise<void> => {
    await addDoc(collection(db, 'categories'), category);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const category: { [index: string]: string | null } = {
      name: state.name,
      icon: state.icon,
      type: state.type,
      color: state.color,
    };

    const isEdit: boolean = context.selectedCategory ? true : false;

    const countError: number = context.validFields(category, isEdit);

    if (countError <= 0) {
      try {
        if (isEdit) {
          editCategory(category);
        } else {
          addCategory(category);
        }
      } catch (e) {
        let errorMsg: string;
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
        <DownshiftSelect ctx="type" changeState={changeState} labelTxt="Type" initial={state.type} view="category" />
        <FormField onChange={handleChange} value={state.name} label="Name" name="name" id="name" errorMsg={context.errors.name} />
        <StyledInputColor onChange={handleChange} value={state.color} label="Color" name="color" id="color" type="color" errorMsg={context.errors.color} />
        <IconFormField stateIcon={state.icon} stateColor={state.color} handleChange={handleChange} type="categories" shape="circle" errorMsg={context.errors.icon} />
        <FormButton label={context.selectedCategory ? 'Edit' : 'Add'} />
      </StyledForm>
    </Wrapper>
  );
};

export default AddCategory;
