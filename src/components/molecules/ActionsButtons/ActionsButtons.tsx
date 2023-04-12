import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';
import { theme } from 'assets/styles/theme';

import { StyledActionsButton, StyledActionsButtonBox } from 'components/molecules/ActionsButtons/ActionsButtons.styles';

interface PropsInterface {
  handleClick: () => void;
  handleDelete: () => void;
}

const ActionsButtons = ({ handleClick, handleDelete }: PropsInterface) => {
  return (
    <StyledActionsButtonBox>
      {handleClick ? (
        <StyledActionsButton onClick={handleClick}>
          <FontAwesomeIcon icon={faIcons.others.faPenToSquare} />
        </StyledActionsButton>
      ) : null}
      {handleDelete ? (
        <StyledActionsButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faIcons.others.faTrashCan} color={theme.colors.red} />
        </StyledActionsButton>
      ) : null}
    </StyledActionsButtonBox>
  );
};

export default ActionsButtons;
