import { StyledError, Wrapper } from 'components/molecules/FormField/FormField.styles';

interface PropsInterface {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  label: string;
  name: string;
  id: string;
  type?: string;
  isHidden?: boolean;
  errorMsg?: string | null;
  min?: string;
  step?: string;
  placeholder?: string | number;
}

const FormField = ({ onChange, value, label, name, id, type = 'text', isHidden = false, errorMsg, min, step, placeholder, ...props }: PropsInterface) => {
  return (
    <Wrapper isHidden={isHidden} type={type}>
      <label htmlFor={id}>{label}</label>
      {errorMsg ? <StyledError>{errorMsg}</StyledError> : null}
      <input name={name} id={id} type={type} value={value} onChange={onChange} min={min} data-testid={label} step={step} {...props} />
    </Wrapper>
  );
};

export default FormField;
