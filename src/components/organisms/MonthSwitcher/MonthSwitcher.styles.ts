import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 0 20px 10px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  color: ${({ theme }: PropsInterface) => theme.colors.white};
  font-size: ${({ theme }: PropsInterface) => theme.size.l};
  cursor: pointer;
`;

export const StyledMonthAndYear = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
`;
