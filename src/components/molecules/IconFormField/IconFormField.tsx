import React from 'react';

import { faIcons } from 'assets/styles/faIcons';

import IconBox from 'components/atoms/IconBox/IconBox';

import { StyledError, StyledIconsBox } from 'components/molecules/IconFormField/IconFormField.styles';
import { StyledInputRadioOrCheckbox } from 'components/atoms/StyledInputRadioOrCheckbox/StyledInputRadioOrCheckbox.styles';

interface PropsInterface {
  stateIcon: string;
  stateColor: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  shape?: string;
  errorMsg?: string | null;
}

const IconFormField = ({ stateIcon, stateColor, handleChange, type, shape = 'square', errorMsg }: PropsInterface) => {
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
