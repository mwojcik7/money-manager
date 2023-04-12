import { TypeType } from 'providers/CategoriesProvider';

import { theme } from 'assets/styles/theme';
import { StyledButton, StyledWrapper } from 'components/organisms/IncomeExpenseSwitcher/IncomeExpenseSwitcher.styles';

interface PropsInterface {
  activeType: TypeType;
  handleChange: (type: TypeType) => void;
}

const IncomeExpenseSwitcher = ({ activeType, handleChange }: PropsInterface) => {
  return (
    <StyledWrapper>
      <StyledButton color={activeType === 'income' ? theme.colors.green : theme.colors.grey} onClick={() => handleChange('income')}>
        Income
      </StyledButton>
      <StyledButton color={activeType === 'expense' ? theme.colors.red : theme.colors.grey} onClick={() => handleChange('expense')}>
        Expense
      </StyledButton>
    </StyledWrapper>
  );
};

export default IncomeExpenseSwitcher;
