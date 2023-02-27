import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';
import { theme } from 'assets/styles/theme';

import { StyledActionsButton, StyledActionsButtonBox } from 'components/molecules/ActionsButtons/ActionsButtons.styles';

const ActionsButtons = ({ handleClick, handleDelete }) => {
  return (
    <StyledActionsButtonBox>
      {handleClick ? (
        <StyledActionsButton onClick={handleClick}>
          <FontAwesomeIcon icon={faIcons['faPenToSquare']} />
        </StyledActionsButton>
      ) : null}
      {handleDelete ? (
        <StyledActionsButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faIcons['faTrashCan']} color={theme.colors.red} />
        </StyledActionsButton>
      ) : null}
    </StyledActionsButtonBox>
  );
};

export default ActionsButtons;
