import { useEffect, useState } from 'react';
import { useSelect } from 'downshift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';
import { theme } from 'assets/styles/theme';

import { AccountWithIdInterface, useAccountsContext } from 'providers/AccountsProvider';
import { CategoryWithIdInterface, useCategoriesContext } from 'providers/CategoriesProvider';
import { TypeType } from 'providers/TransactionsProvider';
import IconBox from 'components/atoms/IconBox/IconBox';

import { StyledArrowBox, StyledLi, StyledSelectedItem, StyledSelectedItemBox, StyledSelectedItemContent, StyledSelectedItemName, StyledUl, Wrapper } from 'components/organisms/DownshiftSelect/DownshiftSelect.styles';

interface PropsInterface {
  changeState: (args: ChangeValuesInterface) => void;
  ctx: string;
  selectedElement?: string;
  labelTxt: string | null;
  stateField?: string | null;
  initial: string | null;
  view?: string | null;
  selectedType?: TypeType;
}

interface TypeInterface {
  id: 'income' | 'expense' | 'transfer';
  name: 'income' | 'expense' | 'transfer';
  color: string;
  icon: string;
}

interface ChangeValuesInterface {
  type?: string | null;
  category?: string;
  toAccount?: string | null;
  account?: string | null;
  parentCategory?: string;
}

const DownshiftSelect = ({ changeState, ctx, selectedElement, labelTxt = null, stateField = null, initial = null, view = null, selectedType }: PropsInterface) => {
  const contextAccounts = useAccountsContext();
  const contextCategories = useCategoriesContext();

  const contextType: TypeInterface[] = [
    { id: 'income', name: 'income', color: theme.colors.green, icon: 'faArrowLeft' },
    { id: 'expense', name: 'expense', color: theme.colors.red, icon: 'faArrowRight' },
  ];

  let contextElements: AccountWithIdInterface[] | CategoryWithIdInterface[] | TypeInterface[] = [];
  let selectedContextItem: AccountWithIdInterface[] | CategoryWithIdInterface[] | TypeInterface[] = [];

  view !== 'category' && contextType.push({ id: 'transfer', name: 'transfer', color: theme.colors.grey, icon: 'faArrowRightArrowLeft' });

  switch (ctx) {
    case 'accounts':
      contextElements = contextAccounts.accounts;
      if (stateField === 'toAccount') {
        contextElements = contextElements.filter((account) => account.id !== selectedElement);
      }
      selectedContextItem = contextElements.filter((contextElement) => contextElement.id === initial);
      break;
    case 'categories':
      contextElements = contextCategories.categories.filter((category) => category.type === selectedElement);
      selectedContextItem = contextElements.filter((contextElement) => contextElement.id === initial);
      break;
    case 'type':
      contextElements = contextType;
      selectedContextItem = contextElements.filter((contextElement) => contextElement.name === initial);
      break;
  }

  const initialSelectedItem: AccountWithIdInterface | CategoryWithIdInterface | TypeInterface = initial && selectedContextItem.length ? selectedContextItem[0] : contextElements[0];

  const [selectedItem, setSelectedItem] = useState<AccountWithIdInterface | CategoryWithIdInterface | TypeInterface | null | undefined>(initialSelectedItem);

  function itemToString(item: AccountWithIdInterface | CategoryWithIdInterface | TypeInterface | null): string {
    return item ? item.name : '';
  }

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect<AccountWithIdInterface | CategoryWithIdInterface | TypeInterface>({
    items: contextElements,
    itemToString,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (ctx === 'type' && initial !== 'transfer') {
        changeState({ type: null });
      } else if (ctx === 'accounts' && selectedType === 'transfer') {
        changeState({ account: null });
      }
      setSelectedItem(newSelectedItem);
    },
  });

  useEffect(() => {
    const changeValues: ChangeValuesInterface = {};

    if (ctx === 'accounts') {
      if (stateField) {
        // delete prevValue.toAccount;
        changeValues.toAccount = selectedItem?.id;
      }
      changeValues.account = selectedItem?.id;
    } else if (ctx === 'categories') {
      if (stateField) {
        changeValues.parentCategory = selectedItem?.id;
      }
      changeValues.category = selectedItem?.id;
    } else if (ctx === 'type') {
      changeValues.type = selectedItem?.name;
      if (selectedItem?.name === 'transfer') {
        changeValues.category = 'transfer';
      } else {
        changeValues.toAccount = null;
      }
    }

    changeState(changeValues);
  }, [selectedItem, changeState, ctx, stateField]);

  return (
    <Wrapper>
      <StyledSelectedItemBox {...getToggleButtonProps()}>
        <StyledSelectedItem>
          <div>{labelTxt}</div>
          <StyledSelectedItemContent>
            <IconBox as="label" htmlFor={selectedItem?.icon} type={ctx} icon={selectedItem?.icon} color={selectedItem?.color} shape="square" />
            <StyledSelectedItemName>{selectedItem && selectedItem.name}</StyledSelectedItemName>
          </StyledSelectedItemContent>
        </StyledSelectedItem>
        <StyledArrowBox isOpen={isOpen}>
          <FontAwesomeIcon icon={faIcons.others.faChevronDown} />
        </StyledArrowBox>
      </StyledSelectedItemBox>
      <StyledUl isOpen={isOpen} {...getMenuProps()}>
        {isOpen &&
          contextElements.map((item, index) => (
            <StyledLi key={item.id} {...getItemProps({ item, index })} isSelected={selectedItem?.id === item.id} isHighlighted={highlightedIndex === index}>
              <IconBox as="label" htmlFor={item.icon} type={ctx} icon={item.icon} color={item.color} shape="square" />
              <span>{item.name}</span>
            </StyledLi>
          ))}
      </StyledUl>
    </Wrapper>
  );
};

export default DownshiftSelect;
