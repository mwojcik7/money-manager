import styled from 'styled-components';

export const StyledInputRadioOrCheckbox = styled.input`
  display: none;

  &:checked + label {
    background-color: ${({ color }) => color};
  }
`;
