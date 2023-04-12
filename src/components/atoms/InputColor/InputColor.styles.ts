import styled from 'styled-components';
import FormField from 'components/molecules/FormField/FormField';

export const StyledInputColor = styled(FormField)`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 110%;
  height: 135%;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ::-webkit-color-swatch {
    border: none;
    border-radius: 15px;
  }

  ::-moz-color-swatch {
    border: none;
    border-radius: 15px;
  }
`;
