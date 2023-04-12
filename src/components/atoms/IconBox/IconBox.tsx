import { ComponentType } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';

import { StyledFA, StyledIconBox } from 'components/atoms/IconBox/IconBox.styles';

type PropsInterface = {
  color?: string,
  type?: string,
  icon?: string,
  isFavourite?: boolean | null,
  shape?: string,
  as?: ComponentType<any> | string,
  hasHover?: boolean,
  htmlFor?: string,
  title?: string,
};

const IconBox = ({ color, type = 'others', icon = 'faEllipsis', isFavourite = null, shape = 'square', as, hasHover, htmlFor, title, ...props }: PropsInterface) => {
  return (
    <StyledIconBox as={as} htmlFor={htmlFor} color={color} shape={shape} hasHover={hasHover} title={title} {...props}>
      <FontAwesomeIcon icon={faIcons[type][icon]} />
      {isFavourite && <StyledFA icon={faIcons.others.faStarSolid} />}
    </StyledIconBox>
  );
};

export default IconBox;
