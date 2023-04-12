import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faIcons } from 'assets/styles/faIcons';

import { ModalWrapper, StyledScrollWrapper } from 'components/organisms/Modal/Modal.styles';

interface PropsInterface {
  handleClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ handleClose, isOpen, children }: PropsInterface) => {
  return (
    <ModalWrapper
      // eslint-disable-next-line prettier/prettier
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
        },
      }}
    >
      <StyledScrollWrapper>{children}</StyledScrollWrapper>
      <button onClick={handleClose}>
        <FontAwesomeIcon icon={faIcons.others.faClose} />
      </button>
    </ModalWrapper>
  );
};

export default Modal;
