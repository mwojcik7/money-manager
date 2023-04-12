import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useModal from 'hooks/useModal';
import Modal from 'components/organisms/Modal/Modal';

import { TransactionWithIdInterface, TransactionsInterface, useTransactionsContext } from 'providers/TransactionsProvider';
import MonthSwitcher from 'components/organisms/MonthSwitcher/MonthSwitcher';
import TransactionsList from 'components/organisms/TransactionsList/TransactionsList';
import AddTransaction from 'views/AddTransaction';

import { faIcons } from 'assets/styles/faIcons';
import { StyledHeader } from 'components/atoms/Header/Header.styles';
import { StyledButtonBackToCurrentMonth, Wrapper } from 'views/Transactions.styles';

const currentMonth: number = new Date().getMonth();
const currentYear: number = new Date().getFullYear();

const getInitialDate = (currentMonth: number, currentYear: number, selectedMonth: number, selectedYear: number): string => {
  let newDate: Date = new Date();

  if ((currentMonth > selectedMonth && currentYear === selectedYear) || currentYear > selectedYear) {
    newDate = new Date(selectedYear, selectedMonth + 1, 0);
  } else if ((currentMonth < selectedMonth && currentYear === selectedYear) || currentYear < selectedYear) {
    newDate = new Date(selectedYear, selectedMonth, 1);
  }

  const dayTmp: number = newDate.getDate();
  const day: string | number = dayTmp < 10 ? `0${dayTmp}` : dayTmp;
  const monthTmp: number = newDate.getMonth() + 1;
  const month: string | number = monthTmp < 10 ? `0${monthTmp}` : monthTmp;
  return `${newDate.getFullYear()}-${month}-${day}`;
};

const Transactions = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const contextTransactions = useTransactionsContext();

  const [transactions, setTransactions] = useState<[string, TransactionsInterface][]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const initialDate: string = getInitialDate(currentMonth, currentYear, selectedMonth, selectedYear);

  const handleClick = (id: string | null = null, date: string | null = null): void => {
    if (id && typeof id === 'string') {
      const transactionsAfterFilterByDate: TransactionWithIdInterface[] = transactions.filter((transaction) => transaction[0] === date)[0][1].transactions;
      const selectedTransaction: TransactionWithIdInterface = Object.entries(transactionsAfterFilterByDate).filter((transaction) => transaction[1].id === id)[0][1];
      contextTransactions.setSelectedTransaction(selectedTransaction);
    }
    handleOpenModal();
  };

  const handleNewCloseModal = (): void => {
    contextTransactions.setSelectedTransaction(null);
    contextTransactions.setErrors({});
    handleCloseModal();
  };

  const backToCurrentMonth = (): void => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  };

  return (
    <Wrapper>
      <StyledHeader>
        Transactions
        <StyledButtonBackToCurrentMonth onClick={backToCurrentMonth} title="Back to current month">
          <FontAwesomeIcon icon={faIcons.others.faCalendarDays} />
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
