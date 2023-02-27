import React, { useContext } from 'react';

import { AccountsContext } from 'providers/AccountsProvider';
import TotalBalance from 'components/molecules/TotalBalance/TotalBalance';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'hooks/useModal';
import AccountsList from 'components/organisms/AccountsList/AccountsList';
import AddAccount from 'views/AddAccount';

import { Wrapper } from 'views/Accounts.styles';
import { StyledHeader } from 'components/atoms/Header/Header.styles';

const Accounts = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const context = useContext(AccountsContext);

  const handleClick = (id = null) => {
    if (id) {
      context.setSelectedAccounts(context.accounts.filter((account) => account.id === id)[0]);
    }

    handleOpenModal();
  };

  const handleNewCloseModal = () => {
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
