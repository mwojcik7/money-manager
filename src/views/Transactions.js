import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from 'components/organisms/Modal/Modal';
import useModal from 'hooks/useModal';

import { TransactionsContext } from 'providers/TransactionsProvider';
import MonthSwitcher from 'components/organisms/MonthSwitcher/MonthSwitcher';
import TransactionsList from 'components/organisms/TransactionsList/TransactionsList';
import AddTransaction from 'views/AddTransaction';

import { faIcons } from 'assets/styles/faIcons';
import { StyledHeader } from 'components/atoms/Header/Header.styles';
import { StyledButtonBackToCurrentMonth, Wrapper } from 'views/Transactions.styles';

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const getInitialDate = (currentMonth, currentYear, selectedMonth, selectedYear) => {
  let newDate = new Date();

  if ((currentMonth > selectedMonth && currentYear === selectedYear) || currentYear > selectedYear) {
    newDate = new Date(selectedYear, selectedMonth + 1, 0);
  } else if ((currentMonth < selectedMonth && currentYear === selectedYear) || currentYear < selectedYear) {
    newDate = new Date(selectedYear, selectedMonth, 1);
  }

  const dayTmp = newDate.getDate();
  const day = dayTmp < 10 ? `0${dayTmp}` : dayTmp;
  const monthTmp = newDate.getMonth() + 1;
  const month = monthTmp < 10 ? `0${monthTmp}` : monthTmp;
  return `${newDate.getFullYear()}-${month}-${day}`;
};

const Transactions = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const contextTransactions = useContext(TransactionsContext);

  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const initialDate = getInitialDate(currentMonth, currentYear, selectedMonth, selectedYear);

  const handleClick = (id = null, date = null) => {
    if (id) {
      const transactionsAfterFilterByDate = transactions.filter((transaction) => transaction[0] === date)[0][1].transactions;
      const selectedTransaction = Object.entries(transactionsAfterFilterByDate).filter((transaction) => transaction[1].id === id)[0][1];
      contextTransactions.setSelectedTransaction(selectedTransaction);
    }
    handleOpenModal();
  };

  const handleNewCloseModal = () => {
    contextTransactions.setSelectedTransaction(null);
    contextTransactions.setErrors({});
    handleCloseModal();
  };

  const backToCurrentMonth = () => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  };

  return (
    <Wrapper>
      <StyledHeader>
        Transactions
        <StyledButtonBackToCurrentMonth onClick={backToCurrentMonth} title="Back to current month">
          <FontAwesomeIcon icon={faIcons['faCalendarDays']} />
        </StyledButtonBackToCurrentMonth>
      </StyledHeader>
      <MonthSwitcher setTransactions={setTransactions} selectedMonth={selectedMonth} selectedYear={selectedYear} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} />
      <TransactionsList transactions={transactions} handleClick={handleClick} />
      <Modal isOpen={isOpen} handleClose={handleNewCloseModal}>
        <AddTransaction handleClose={handleNewCloseModal} initialDate={initialDate} />
      </Modal>
    </Wrapper>
  );
};

export default Transactions;
