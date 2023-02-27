import React, { useContext, useState } from 'react';

import { CategoriesContext } from 'providers/CategoriesProvider';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'hooks/useModal';
import CategoriesList from 'components/organisms/CategoriesList/CategoriesList';
import IncomeExpenseSwitcher from 'components/organisms/IncomeExpenseSwitcher/IncomeExpenseSwitcher';
import AddCategory from 'views/AddCategory';

import { Wrapper } from 'views/Categories.styles';
import { StyledHeader } from 'components/atoms/Header/Header.styles';

const Categories = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const context = useContext(CategoriesContext);

  const [activeType, setActiveType] = useState('expense');

  const handleClick = (id = null) => {
    if (id) {
      context.setSelectedCategory(context.categories.filter((category) => category.id === id)[0]);
    }
    handleOpenModal();
  };

  const handleChange = (type) => {
    setActiveType(type);
  };

  const handleNewCloseModal = () => {
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
