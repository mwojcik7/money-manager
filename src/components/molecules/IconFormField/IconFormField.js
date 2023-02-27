import React from 'react';

import { faIcons } from 'assets/styles/faIcons';

import IconBox from 'components/atoms/IconBox/IconBox';

import { StyledError, StyledIconsBox } from 'components/molecules/IconFormField/IconFormField.styles';
import { StyledInputRadioOrCheckbox } from 'components/atoms/StyledInputRadioOrCheckbox/StyledInputRadioOrCheckbox.styles';

const IconFormField = ({ stateIcon, stateColor, handleChange, type, shape = 'square', errorMsg }) => {
  return (
    <>
      <div>
        <div>Icon</div>
        {errorMsg ? <StyledError>{errorMsg}</StyledError> : null}
      </div>
      <StyledIconsBox>
        {Object.keys(faIcons[type]).map((icon) => (
          <React.Fragment key={icon}>
            <StyledInputRadioOrCheckbox type="radio" name="icon" id={icon} defaultChecked={stateIcon === icon} color={stateColor} onChange={handleChange} />
            <IconBox as="label" htmlFor={icon} type={type} icon={icon} shape={shape} hasHover={true} />
          </React.Fragment>
        ))}
      </StyledIconsBox>
    </>
  );
};

export default IconFormField;
