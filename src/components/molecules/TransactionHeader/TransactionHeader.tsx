import { TransactionsInterface } from 'providers/TransactionsProvider';

import { StyledDateBox, StyledDayNumber, StyledLi, StyledTotalBalanceForDay } from 'components/molecules/TransactionHeader/TransactionHeader.styles';

interface PropsInterface {
  date: TransactionsInterface;
}

const TransactionHeader = ({ date }: PropsInterface) => {
  const totalBalanceForDay: number = +(Number.isInteger(+date.totalBalanceForDay.toFixed(2)) ? date.totalBalanceForDay : date.totalBalanceForDay.toFixed(2));

  return (
    <StyledLi>
      <StyledDateBox>
        <StyledDayNumber>{date.dateInfo.day}</StyledDayNumber>
        <div>
          <div>{date.dateInfo.dayOfWeek}</div>
          <div>
            {date.dateInfo.monthName} {date.dateInfo.year}
          </div>
        </div>
      </StyledDateBox>
      <StyledTotalBalanceForDay totalBalanceForDay={date.totalBalanceForDay}>{totalBalanceForDay || 0} zł</StyledTotalBalanceForDay>
    </StyledLi>
  );
};

export default TransactionHeader;
