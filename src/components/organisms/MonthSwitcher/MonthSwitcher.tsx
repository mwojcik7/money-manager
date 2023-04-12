import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { months } from 'helpers/months';
import { faIcons } from 'assets/styles/faIcons';

import { TransactionsInterface, useTransactionsContext } from 'providers/TransactionsProvider';

import { StyledButton, StyledMonthAndYear, Wrapper } from 'components/organisms/MonthSwitcher/MonthSwitcher.styles';

interface PropsInterface {
  setTransactions: React.Dispatch<React.SetStateAction<[string, TransactionsInterface][]>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const MonthSwitcher = ({ setTransactions, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }: PropsInterface) => {
  const contextTransactions = useTransactionsContext();

  const changeMonth = (mode: string): void => {
    if (mode === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(Object.keys(months).length - 1);
        setSelectedYear((prevValue) => prevValue - 1);
      } else {
        setSelectedMonth((prevValue) => prevValue - 1);
      }
    } else {
      if (selectedMonth === Object.keys(months).length - 1) {
        setSelectedMonth(0);
        setSelectedYear((prevValue) => prevValue + 1);
      } else {
        setSelectedMonth((prevValue) => prevValue + 1);
      }
    }
  };

  useEffect(() => {
    const transactionsByMonth: [string, TransactionsInterface][] = contextTransactions.getTransactionsByMonthAndYear(selectedMonth, selectedYear);
    setTransactions(transactionsByMonth);
  }, [contextTransactions, selectedMonth, selectedYear, setTransactions]);

  return (
    <Wrapper>
      <StyledButton onClick={() => changeMonth('prev')}>
        <FontAwesomeIcon icon={faIcons.others.faChevronLeft} />
      </StyledButton>
      <StyledMonthAndYear>
        {months[selectedMonth]} {selectedYear}
      </StyledMonthAndYear>
      <StyledButton onClick={() => changeMonth('next')}>
        <FontAwesomeIcon icon={faIcons.others.faChevronRight} />
      </StyledButton>
    </Wrapper>
  );
};

export default MonthSwitcher;
