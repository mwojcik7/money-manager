import { deleteDoc, doc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { AccountWithIdInterface } from 'providers/AccountsProvider';
import IconBox from 'components/atoms/IconBox/IconBox';
import ActionsButtons from 'components/molecules/ActionsButtons/ActionsButtons';

import { StyledAccountItem, StyledAccountItemContentBox } from 'components/molecules/AccountsListItem/AccountsListItem.styles';

interface PropsInterface {
  account: AccountWithIdInterface;
  ind: number;
  handleClick: (id: string) => void;
  drag: () => void;
  drop: () => void;
}

const AccountsListItem = ({ account, ind, handleClick, drag, drop }: PropsInterface) => {
  const { dispatchError } = useError();

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const accountsRef = doc(db, 'accounts', id);
      await deleteDoc(accountsRef);
    } catch (e) {
      dispatchError('Account not deleted');
    }
  };

  return (
    <StyledAccountItem value={account} data-id={account.id} data-order={ind + 1} onDragStart={drag} onDragEnd={drop}>
      {/* <StyledAccountItem value={account} data-id={account.id} data-order={ind + 1} onMouseDown={drag} onMouseUp={drop} onTouchStart={drag} onTouchEnd={drop}> */}
      <IconBox color={account.color} type="accounts" icon={account.icon} isFavourite={account.isFavourite} />
      <StyledAccountItemContentBox balance={account.balance}>
        <div>{account.name}</div>
        <div>{account.balance} zł</div>
      </StyledAccountItemContentBox>
      <ActionsButtons handleClick={() => handleClick(account.id)} handleDelete={() => handleDelete(account.id)} />
    </StyledAccountItem>
  );
};

export default AccountsListItem;
