import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { months } from 'helpers/months';
import { faIcons } from 'assets/styles/faIcons';

import { TransactionsContext } from 'providers/TransactionsProvider';

import { StyledButton, StyledMonthAndYear, Wrapper } from 'components/organisms/MonthSwitcher/MonthSwitcher.styles';

const MonthSwitcher = ({ setTransactions, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  const contextTransactions = useContext(TransactionsContext);

  const changeMonth = (mode) => {
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
    const transactionsByMonth = Object.entries(contextTransactions.transactions).filter((transaction) => +transaction[0].substring(5, 7) === selectedMonth + 1 && +transaction[0].substring(0, 4) === selectedYear);
    setTransactions(transactionsByMonth);
  }, [contextTransactions, selectedMonth, selectedYear, setTransactions]);

  return (
    <Wrapper>
      <StyledButton onClick={() => changeMonth('prev')}>
        <FontAwesomeIcon icon={faIcons['faChevronLeft']} />
      </StyledButton>
      <StyledMonthAndYear>
        {months[selectedMonth]} {selectedYear}
      </StyledMonthAndYear>
      <StyledButton onClick={() => changeMonth('next')}>
        <FontAwesomeIcon icon={faIcons['faChevronRight']} />
      </StyledButton>
    </Wrapper>
  );
};

export default MonthSwitcher;
