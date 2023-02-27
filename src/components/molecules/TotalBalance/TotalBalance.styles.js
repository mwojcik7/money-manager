import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.size.xl};
  margin: 0 20px;
`;

export const StyledTotalBalance = styled.div`
  color: ${({ theme, totalBalance }) => totalBalance > 0 && theme.colors.green};
  font-weight: bold;
`;
