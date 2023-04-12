import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledButton, StyledIconBox } from 'components/atoms/Button/Button.styles';

interface PropsInterface {
  handleClick: () => void;
  icon: IconProp;
  label?: string | null;
  title?: string;
}

const Button = ({ handleClick, icon, label = null, title }: PropsInterface) => {
  return (
    <StyledButton onClick={handleClick} title={title}>
      <StyledIconBox>
        <FontAwesomeIcon icon={icon} />
      </StyledIconBox>
      {label}
    </StyledButton>
  );
};

export default Button;
