import React, { useContext } from 'react';

import { faIcons } from 'assets/styles/faIcons';

import { CategoriesContext } from 'providers/CategoriesProvider';
import Button from 'components/atoms/Button/Button';
import CategoriesListItem from 'components/molecules/CategoriesListItem/CategoriesListItem';

import { StyledList, StyledNoCategories } from 'components/organisms/CategoriesList/CategoriesList.styles';

const CategoriesList = ({ activeType, handleClick }) => {
  const context = useContext(CategoriesContext);

  let categories = context.categories.filter((category) => category.type === activeType);
  categories = categories.map((category, ind) => <CategoriesListItem key={category.id} category={category} ind={ind} handleClick={handleClick} />);

  return (
    <StyledList>
      {categories.length > 0 ? categories : <StyledNoCategories>No Categories</StyledNoCategories>}
      <Button handleClick={handleClick} icon={faIcons['faPlus']} title="Add category" />
    </StyledList>
  );
};

export default CategoriesList;
