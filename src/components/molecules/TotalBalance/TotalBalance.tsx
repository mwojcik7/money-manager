import { useAccountsContext } from 'providers/AccountsProvider';

import { StyledTotalBalance, Wrapper } from 'components/molecules/TotalBalance/TotalBalance.styles';

const TotalBalance = () => {
  const context = useAccountsContext();
  const totalBalance: number = +context.accounts.reduce((prev, curr) => prev + curr.balance, 0).toFixed(2);

  return (
    <Wrapper>
      <div>Total balance</div>
      <StyledTotalBalance totalBalance={totalBalance}>{totalBalance} zł</StyledTotalBalance>
    </Wrapper>
  );
};

export default TotalBalance;
