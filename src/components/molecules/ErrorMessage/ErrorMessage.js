import { Wrapper } from 'components/molecules/ErrorMessage/ErrorMessage.styles';
import { useError } from 'hooks/useError';

const defaultErrorMessage = 'Something went wrong. Please try again, or contact our support.';

const ErrorMessage = () => {
  const { error } = useError();

  return (
    <Wrapper>
      <h3>Ooops!</h3>
      <p>{error || defaultErrorMessage}</p>
    </Wrapper>
  );
};

export default ErrorMessage;
