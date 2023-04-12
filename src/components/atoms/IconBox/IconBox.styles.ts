import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
  hasHover?: boolean;
  shape?: string;
  color?: string;
}

export const StyledIconBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: ${({ shape }: PropsInterface) => (shape === 'circle' ? '50%' : '5px')};
  background-color: ${({ theme, color }: PropsInterface) => (color ? color : theme.colors.darkGrey)};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme, hasHover }: PropsInterface) => hasHover && theme.colors.grey};
  }
`;

export const StyledFA = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  color: ${({ theme }: PropsInterface) => theme.colors.gold};
`;
