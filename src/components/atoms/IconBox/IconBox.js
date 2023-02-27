import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';

import { StyledFA, StyledIconBox } from 'components/atoms/IconBox/IconBox.styles';

const IconBox = ({ color, type, icon, isFavourite = null, shape = 'square', as, hasHover, htmlFor, ...props }) => {
  return (
    <StyledIconBox as={as} htmlFor={htmlFor} color={color} shape={shape} hasHover={hasHover} {...props}>
      <FontAwesomeIcon icon={type ? faIcons[type][icon] : faIcons[icon]} />
      {isFavourite && <StyledFA icon={faIcons['faStarSolid']} />}
    </StyledIconBox>
  );
};

export default IconBox;
