import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledButton, StyledIconBox } from 'components/atoms/Button/Button.styles';

const Button = ({ handleClick, icon, label = null }) => {
  return (
    <StyledButton onClick={handleClick}>
      <StyledIconBox>
        <FontAwesomeIcon icon={icon} />
      </StyledIconBox>
      {label}
    </StyledButton>
  );
};

export default Button;
