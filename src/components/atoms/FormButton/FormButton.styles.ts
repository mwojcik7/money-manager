import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
}

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-width: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }: PropsInterface) => theme.colors.white};
  border-radius: 5px;
  background-color: ${({ theme }: PropsInterface) => theme.colors.darkGrey};
  color: ${({ theme }: PropsInterface) => theme.colors.white};
  font-size: ${({ theme }: PropsInterface) => theme.size.s};
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }: PropsInterface) => theme.colors.grey};
  }
`;
