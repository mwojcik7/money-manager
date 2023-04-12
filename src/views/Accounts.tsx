import React from 'react';

import useModal from 'hooks/useModal';
import Modal from 'components/organisms/Modal/Modal';

import { useAccountsContext } from 'providers/AccountsProvider';
import TotalBalance from 'components/molecules/TotalBalance/TotalBalance';
import AccountsList from 'components/organisms/AccountsList/AccountsList';
import AddAccount from 'views/AddAccount';

import { Wrapper } from 'views/Accounts.styles';
import { StyledHeader } from 'components/atoms/Header/Header.styles';

const Accounts = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const context = useAccountsContext();

  React.useEffect(() => {
    document.title = 'Accounts';
  }, []);

  const handleClick = (id: string | null = null): void => {
    if (id) {
      context.setSelectedAccounts(context.accounts.filter((account) => account.id === id)[0]);
    }

    handleOpenModal();
  };

  const handleNewCloseModal = (): void => {
    context.setSelectedAccounts(null);
    context.setErrors({});
    handleCloseModal();
  };

  return (
    <Wrapper>
      <StyledHeader>Accounts</StyledHeader>
      <TotalBalance />
      <AccountsList handleClick={handleClick} />
      <Modal isOpen={isOpen} handleClose={handleNewCloseModal}>
        <AddAccount handleClose={handleNewCloseModal} />
      </Modal>
    </Wrapper>
  );
};

export default Accounts;
