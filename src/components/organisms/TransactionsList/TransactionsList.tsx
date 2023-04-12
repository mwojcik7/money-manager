import React from 'react';

import { faIcons } from 'assets/styles/faIcons';

import { TransactionsInterface } from 'providers/TransactionsProvider';
import Button from 'components/atoms/Button/Button';
import TransactionHeader from 'components/molecules/TransactionHeader/TransactionHeader';
import TransactionsListItem from 'components/molecules/TransactionsListItem/TransactionsListItem';

import { StyledList, StyledNoTransactions } from 'components/organisms/TransactionsList/TransactionsList.styles';

interface PropsInterface {
  transactions: [string, TransactionsInterface][];
  handleClick: () => void;
}

const TransactionsList = ({ transactions, handleClick }: PropsInterface) => {
  return (
    <StyledList>
      {transactions.length > 0 ? (
        transactions.map((date) => (
          <React.Fragment key={date[0]}>
            <TransactionHeader date={date[1]} />
            {date[1].transactions.map((transaction, key) => (
              <TransactionsListItem key={transaction.id} transaction={transaction} tKey={key} handleClick={handleClick} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <StyledNoTransactions>No transactions</StyledNoTransactions>
      )}
      <Button handleClick={handleClick} icon={faIcons.others.faPlus} title="Add transaction" />
    </StyledList>
  );
};

export default TransactionsList;
