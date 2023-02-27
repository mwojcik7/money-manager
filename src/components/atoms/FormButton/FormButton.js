import { StyledButton } from 'components/atoms/FormButton/FormButton.styles';

const FormButton = ({ label = null }) => {
  return <StyledButton>{label}</StyledButton>;
};

export default FormButton;
