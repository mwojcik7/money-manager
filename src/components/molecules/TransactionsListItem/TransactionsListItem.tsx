import { deleteDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';
import { faIcons } from 'assets/styles/faIcons';
import { theme } from 'assets/styles/theme';

import { TransactionWithIdInterface } from 'providers/TransactionsProvider';
import { AccountWithIdInterface, useAccountsContext } from 'providers/AccountsProvider';
import { CategoryWithIdInterface, useCategoriesContext } from 'providers/CategoriesProvider';
import ActionsButtons from 'components/molecules/ActionsButtons/ActionsButtons';

import { StyledAmount, StyledAmountAndActionsBox, StyledCategoryItem, StyledContentItem, StyledSmallerContentItem, StyledToAccount, StyledIconBox } from 'components/molecules/TransactionsListItem/TransactionsListItem.styles';

interface PropsInterface {
  transaction: TransactionWithIdInterface;
  tKey: number;
  handleClick: (id: string, date: string) => void;
}

const TransactionsListItem = ({ transaction, tKey, handleClick }: PropsInterface) => {
  const contextAccounts = useAccountsContext();
  const contextCategories = useCategoriesContext();

  const { dispatchError } = useError();

  let category: CategoryWithIdInterface[] = contextCategories.categories.filter((cat) => cat.id === transaction.category);
  const account: AccountWithIdInterface[] = contextAccounts.accounts.filter((acc) => acc.id === transaction.account);
  const toAccount: AccountWithIdInterface[] = contextAccounts.accounts.filter((acc) => acc.id === transaction.toAccount);

  if (transaction.type === 'transfer') {
    const transferIcon = 'faMoneyBillTransfer';
    const transferColor: string = theme.colors.grey;
    category = [{ icon: transferIcon, color: transferColor, name: 'Transfer', id: 'transfer', type: 'transfer' }];
  } else if (!category.length) {
    category = [{ icon: 'faEllipsis', color: theme.colors.grey, name: 'Other', id: 'other', type: 'other' }];
  }

  const handleDelete = async (id: string) => {
    try {
      const transactionsRef = doc(db, 'transactions', id);
      await deleteDoc(transactionsRef);
    } catch (e) {
      dispatchError('Transaction not deleted');
    }
  };

  return (
    <StyledCategoryItem data-id={transaction.id} data-order={tKey + 1}>
      <StyledIconBox color={category[0].color} type="categories" shape="circle" icon={category[0].icon} />
      <div>
        <StyledContentItem>{transaction.description}</StyledContentItem>
        <StyledSmallerContentItem>
          {account.length ? <FontAwesomeIcon icon={faIcons.accounts[account[0].icon]} /> : null} {account.length ? account[0].name : null}
          <StyledToAccount>
            {toAccount.length ? <FontAwesomeIcon icon={faIcons.others.faArrowRight} /> : null}
            {toAccount.length ? <FontAwesomeIcon icon={faIcons.accounts[toAccount[0].icon]} /> : null} {toAccount.length ? toAccount[0].name : null}
          </StyledToAccount>
        </StyledSmallerContentItem>
        <StyledSmallerContentItem>{category[0].name}</StyledSmallerContentItem>
      </div>
      <StyledAmountAndActionsBox>
        <StyledAmount amount={transaction.type === 'transfer' ? 0 : transaction.amount}>{transaction.amount} zł</StyledAmount>
        <ActionsButtons handleClick={() => handleClick(transaction.id, transaction.date)} handleDelete={() => handleDelete(transaction.id)} />
      </StyledAmountAndActionsBox>
    </StyledCategoryItem>
  );
};

export default TransactionsListItem;
