import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
  color?: string;
}

export const StyledButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: none;
  background-color: transparent;
  color: ${({ theme }: PropsInterface) => theme.colors.white};
  font-size: ${({ theme }: PropsInterface) => theme.size.s};
  text-decoration: none;
  cursor: pointer;
`;

export const StyledIconBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 2px solid ${({ theme }: PropsInterface) => theme.colors.white};
  border-radius: 5px;
  background-color: ${({ theme, color }: PropsInterface) => (color ? color : theme.colors.nav1)};
  transition: 0.2s;
  box-shadow: 0 0 10px #0006, 0 0 30px #0006, 0 0 50px #0009;

  &:hover {
    background-color: ${({ theme }: PropsInterface) => theme.colors.grey};
  }
`;
