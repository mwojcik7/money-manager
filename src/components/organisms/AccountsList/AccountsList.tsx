import { useEffect, useState } from 'react';
import { doc, writeBatch } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { faIcons } from 'assets/styles/faIcons';

import { useAccountsContext } from 'providers/AccountsProvider';
import Button from 'components/atoms/Button/Button';
import AccountsListItem from 'components/molecules/AccountsListItem/AccountsListItem';

import { StyledNoAccounts, StyledReorderGroup } from 'components/organisms/AccountsList/AccountsList.styles';

interface PropsInterface {
  handleClick: () => void;
}

const AccountsList = ({ handleClick }: PropsInterface) => {
  const context = useAccountsContext();

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const drag = (): void => {
    setIsDragging(true);
  };

  const drop = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging !== null && !isDragging) {
      const batch = writeBatch(db);

      let isChange = false;

      context.accounts.forEach((account, index) => {
        if (account.order !== index + 1) {
          const accountsRef = doc(db, 'accounts', account.id);
          batch.update(accountsRef, { order: index + 1 });

          isChange = true;
        }
      });

      // if (batch._mutations.length) {
      if (isChange) {
        batch.commit();
      }
    }
  }, [isDragging, context.accounts]);

  const accounts = context.accounts.map((account, ind) => <AccountsListItem key={account.id} account={account} ind={ind} handleClick={handleClick} drag={drag} drop={drop} />);

  return (
    <StyledReorderGroup axis="y" values={context.accounts} onReorder={context.setAccounts}>
      {accounts.length > 0 ? accounts : <StyledNoAccounts>No Accounts</StyledNoAccounts>}
      <Button handleClick={handleClick} icon={faIcons.others.faPlus} title="Add account" />
    </StyledReorderGroup>
  );
};

export default AccountsList;
