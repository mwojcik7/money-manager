import React, { useState } from 'react';

import useModal from 'hooks/useModal';
import Modal from 'components/organisms/Modal/Modal';

import { TypeType, useCategoriesContext } from 'providers/CategoriesProvider';
import CategoriesList from 'components/organisms/CategoriesList/CategoriesList';
import IncomeExpenseSwitcher from 'components/organisms/IncomeExpenseSwitcher/IncomeExpenseSwitcher';
import AddCategory from 'components/organisms/AddCategory/AddCategory';

import { Wrapper } from 'views/Categories.styles';
import { StyledHeader } from 'components/atoms/Header/Header.styles';

const Categories = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const context = useCategoriesContext();

  const [activeType, setActiveType] = useState<TypeType>('expense');

  React.useEffect(() => {
    document.title = 'Categories';
  }, []);

  const handleClick = (id: string | null = null): void => {
    if (id) {
      context.setSelectedCategory(context.categories.filter((category) => category.id === id)[0]);
    }
    handleOpenModal();
  };

  const handleChange = (type: TypeType): void => {
    setActiveType(type);
  };

  const handleNewCloseModal = (): void => {
    context.setSelectedCategory(null);
    context.setErrors({});
    handleCloseModal();
  };

  return (
    <Wrapper>
      <StyledHeader>Categories</StyledHeader>
      <IncomeExpenseSwitcher activeType={activeType} handleChange={handleChange} />
      <CategoriesList activeType={activeType} handleClick={handleClick} />
      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <AddCategory handleClose={handleNewCloseModal} activeType={activeType} />
      </Modal>
    </Wrapper>
  );
};

export default Categories;
