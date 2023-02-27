import IconBox from 'components/atoms/IconBox/IconBox';
import styled from 'styled-components';

export const StyledCategoryItem = styled.li`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  user-select: none;
  flex: 1;
`;

export const StyledContentItem = styled.p`
  margin: 8px 0;
`;

export const StyledSmallerContentItem = styled(StyledContentItem)`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.gr2};
  font-size: ${({ theme }) => theme.size.xs};
  flex-wrap: wrap;
`;

export const StyledAmountAndActionsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-left: auto;
`;

export const StyledAmount = styled.div`
  margin: 0;
  margin-top: 8px;
  margin-left: auto;
  color: ${({ theme, amount }) => (amount < 0 ? theme.colors.red : amount > 0 ? theme.colors.green : theme.colors.grey)};
`;

export const StyledToAccount = styled.span`
  display: flex;
  gap: 5px;
`;

export const StyledIconBox = styled(IconBox)`
  align-self: center;
`;
