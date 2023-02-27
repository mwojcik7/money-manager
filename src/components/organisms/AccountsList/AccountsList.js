import React, { useContext, useEffect, useState } from 'react';
import { doc, writeBatch } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { faIcons } from 'assets/styles/faIcons';

import { AccountsContext } from 'providers/AccountsProvider';
import Button from 'components/atoms/Button/Button';
import AccountsListItem from 'components/molecules/AccountsListItem/AccountsListItem';

import { StyledNoAccounts, StyledReorderGroup } from 'components/organisms/AccountsList/AccountsList.styles';

const AccountsList = ({ handleClick }) => {
  const context = useContext(AccountsContext);

  const [isDragging, setIsDragging] = useState(null);

  const drag = () => {
    setIsDragging(true);
  };

  const drop = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging !== null && !isDragging) {
      const batch = writeBatch(db);

      context.accounts.forEach((account, index) => {
        if (account.order !== index + 1) {
          const accountsRef = doc(db, 'accounts', account.id);
          batch.update(accountsRef, { order: index + 1 });
        }
      });

      if (batch._mutations.length) {
        batch.commit();
      }
    }
  }, [isDragging, context.accounts]);

  const accounts = context.accounts.map((account, ind) => <AccountsListItem key={account.id} account={account} ind={ind} handleClick={handleClick} drag={drag} drop={drop} />);

  return (
    <StyledReorderGroup axis="y" values={context.accounts} onReorder={context.setAccounts}>
      {accounts.length > 0 ? accounts : <StyledNoAccounts>No Accounts</StyledNoAccounts>}
      <Button handleClick={handleClick} icon={faIcons['faPlus']} title="Add account" />
    </StyledReorderGroup>
  );
};

export default AccountsList;
