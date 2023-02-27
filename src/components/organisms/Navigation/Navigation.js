import { faIcons } from 'assets/styles/faIcons';

import { theme } from 'assets/styles/theme';
import { StyledIcons, StyledLink, Wrapper } from 'components/organisms/Navigation/Navigation.styles';

const Navigation = () => {
  return (
    <Wrapper>
      <StyledLink to="/accounts" exact="true" activecolor={theme.colors.nav1}>
        <StyledIcons icon={faIcons['faCreditCardSolid']} /> Accounts
      </StyledLink>
      <StyledLink to="/categories" activecolor={theme.colors.nav2}>
        <StyledIcons icon={faIcons['faCategories']} /> Categories
      </StyledLink>
      <StyledLink to="/transactions" activecolor={theme.colors.nav3}>
        <StyledIcons icon={faIcons['faReceipt']} /> Transactions
      </StyledLink>
    </Wrapper>
  );
};

export default Navigation;
