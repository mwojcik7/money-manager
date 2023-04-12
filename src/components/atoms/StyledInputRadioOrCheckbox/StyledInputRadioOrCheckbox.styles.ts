import styled from 'styled-components';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme?: ThemeInterface;
  color?: string;
}

export const StyledInputRadioOrCheckbox = styled.input`
  display: none;

  &:checked + label {
    background-color: ${({ color }: PropsInterface) => color};
  }
`;
