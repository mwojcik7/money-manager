import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
  totalBalance: number;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }: { theme: ThemeInterface }) => theme.size.xl};
  margin: 0 20px;
`;

export const StyledTotalBalance = styled.div`
  color: ${({ theme, totalBalance }: PropsInterface) => totalBalance > 0 && theme.colors.green};
  font-weight: bold;
`;
