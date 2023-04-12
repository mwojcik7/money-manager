import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
  totalBalanceForDay: number;
}

export const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const StyledDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
`;

export const StyledDayNumber = styled.div`
  font-size: ${({ theme }: { theme: ThemeInterface }) => theme.size.xxxl};
  font-weight: bold;
`;

export const StyledTotalBalanceForDay = styled.div`
  color: ${({ theme, totalBalanceForDay }: PropsInterface) => (totalBalanceForDay < 0 ? theme.colors.red : totalBalanceForDay > 0 ? theme.colors.green : theme.colors.grey)};
  font-size: ${({ theme }: PropsInterface) => theme.size.xl};
  font-weight: bold;
`;
