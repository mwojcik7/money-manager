import React, { useContext, useEffect, useState } from 'react';
import { useSelect } from 'downshift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';

import { AccountsContext } from 'providers/AccountsProvider';
import { CategoriesContext } from 'providers/CategoriesProvider';
import IconBox from 'components/atoms/IconBox/IconBox';

import { theme } from 'assets/styles/theme';
import { StyledArrowBox, StyledLi, StyledSelectedItem, StyledSelectedItemBox, StyledSelectedItemContent, StyledSelectedItemName, StyledUl, Wrapper } from 'components/organisms/DownshiftSelect/DownshiftSelect.styles';

const DownshiftSelect = ({ changeState, ctx, selectedElement, labelTxt = null, stateField = null, initial = null, view = null, selectedType }) => {
  const contextAccounts = useContext(AccountsContext);
  const contextCategories = useContext(CategoriesContext);

  const contexts = {
    accounts: contextAccounts.accounts,
    categories: contextCategories.categories,
    type: [
      { id: 'income', name: 'income', color: theme.colors.green, icon: 'faArrowLeft' },
      { id: 'expense', name: 'expense', color: theme.colors.red, icon: 'faArrowRight' },
    ],
  };

  view !== 'category' && contexts.type.push({ id: 'transfer', name: 'transfer', color: theme.colors.grey, icon: 'faArrowRightArrowLeft' });

  let contextElements = ctx === 'categories' ? contexts[ctx].filter((category) => category.type === selectedElement) : contexts[ctx];

  contextElements = stateField === 'toAccount' && ctx === 'accounts' ? contextElements.filter((account) => account.id !== selectedElement) : contextElements;

  const selectedContextItem = contextElements.filter((contextElement) => {
    let selectedElementField;

    if (ctx === 'type') {
      selectedElementField = contextElement.name;
    } else {
      selectedElementField = contextElement.id;
    }

    return selectedElementField === initial;
  });

  const initialSelectedItem = initial && selectedContextItem.length ? selectedContextItem[0] : contextElements[0];

  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  function itemToString(item) {
    return item ? item.name : '';
  }

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items: contextElements,
    itemToString,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (ctx === 'type' && initial !== 'transfer') {
        changeState((prevValue) => ({ ...prevValue, type: null }));
      } else if (ctx === 'accounts' && selectedType === 'transfer') {
        changeState((prevValue) => ({ ...prevValue, account: null }));
      }
      setSelectedItem(newSelectedItem);
    },
  });

  useEffect(() => {
    changeState((prevValue) => {
      if (ctx === 'accounts') {
        if (stateField) {
          return { ...prevValue, toAccount: selectedItem.id };
        }
        return { ...prevValue, account: selectedItem.id };
      } else if (ctx === 'categories') {
        if (stateField) {
          return { ...prevValue, parentCategory: selectedItem.id };
        }
        return { ...prevValue, category: selectedItem.id };
      } else if (ctx === 'type') {
        const changeValues = { type: selectedItem.name };
        if (selectedItem.name === 'transfer') {
          changeValues.category = 'transfer';
        } else {
          changeValues.toAccount = null;
        }
        return { ...prevValue, ...changeValues };
      }
    });
  }, [selectedItem, changeState, ctx, stateField]);

  return (
    <Wrapper>
      <StyledSelectedItemBox {...getToggleButtonProps()}>
        <StyledSelectedItem>
          <div>{labelTxt}</div>
          <StyledSelectedItemContent>
            <IconBox as="label" htmlFor={selectedItem.icon} type={ctx} icon={selectedItem.icon} color={selectedItem.color} shape="square" />
            <StyledSelectedItemName>{selectedItem && selectedItem.name}</StyledSelectedItemName>
          </StyledSelectedItemContent>
        </StyledSelectedItem>
        <StyledArrowBox isOpen={isOpen}>
          <FontAwesomeIcon icon={faIcons.faChevronDown} />
        </StyledArrowBox>
      </StyledSelectedItemBox>
      <StyledUl isOpen={isOpen} {...getMenuProps()}>
        {isOpen &&
          contextElements.map((item, index) => (
            <StyledLi key={item.id} {...getItemProps({ item, index })} isSelected={selectedItem.id === item.id} isHighlighted={highlightedIndex === index}>
              <IconBox as="label" htmlFor={item.icon} type={ctx} icon={item.icon} color={item.color} shape="square" />
              <span>{item.name}</span>
            </StyledLi>
          ))}
      </StyledUl>
    </Wrapper>
  );
};

export default DownshiftSelect;
