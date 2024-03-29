import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
  isOpen?: boolean;
  color?: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme, color }: PropsInterface) => (color ? color : theme.colors.darkGrey)};
  user-select: none;
`;

export const StyledSelectedItemBox = styled.div`
  display: flex;
  cursor: pointer;
`;

export const StyledSelectedItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledSelectedItemContent = styled.div`
  display: flex;
  gap: 5px;
`;

export const StyledSelectedItemName = styled.div`
  margin-top: 10px;
  text-align: center;
`;

// eslint-disable-next-line prettier/prettier
export const StyledArrowBox = styled.span<PropsInterface>`
  align-self: center;
  margin-left: auto;
  transition: 0.3s;
  transform: ${({ isOpen }) => (isOpen ? `rotate(-180deg)` : null)};
`;

export const StyledUl = styled.ul`
  position: absolute;
  left: 0;
  top: 100%;
  display: ${({ isOpen }: PropsInterface) => (!isOpen ? 'none' : 'flex')};
  flex-wrap: wrap;
  width: 100%;
  margin-top: 0;
  padding: 20px;
  background-color: ${({ theme }: PropsInterface) => theme.colors.darkGrey};
  box-shadow: 0 6px 10px #000a;
  z-index: 2;
`;

export const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border: ${({ theme, isSelected }: PropsInterface) => (isSelected ? `5px solid ${theme.colors.lightGrey}` : null)};
  background-color: ${({ theme, isHighlighted }: PropsInterface) => (isHighlighted ? theme.colors.lightGrey : theme.colors.darkGrey)};
  cursor: pointer;
  white-space: nowrap;

  span {
    margin-top: 10px;
    font-size: ${({ theme }: PropsInterface) => theme.size.xxs};
    text-align: center;
  }
`;
