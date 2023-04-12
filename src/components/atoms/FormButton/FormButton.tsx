import { StyledButton } from 'components/atoms/FormButton/FormButton.styles';

type PropsInterface = {
  label: string | null,
};

const FormButton = ({ label = null }: PropsInterface) => {
  return <StyledButton>{label}</StyledButton>;
};

export default FormButton;
