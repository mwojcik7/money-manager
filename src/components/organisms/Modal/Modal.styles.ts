import styled from 'styled-components';
import ReactModal from 'react-modal';

interface ThemeInterface {
  colors: { [index: string]: string };
  size: { [index: string]: string };
}

interface PropsInterface {
  theme: ThemeInterface;
}

export const ModalWrapper = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 40px);
  max-width: 1000px;
  min-width: 300px;
  min-height: 300px;
  max-height: 90vh;
  border-radius: 15px;
  background-color: ${({ theme }: PropsInterface) => theme.colors.lightGrey};
  box-shadow: 0 -5px 25px -10px rgba(0, 0, 0, 0.3);

  &:focus {
    outline: none;
  }

  > button {
    position: fixed;
    top: 20px;
    right: 20px;
    border: none;
    background-color: transparent;
    color: ${({ theme }: PropsInterface) => theme.colors.white};
    font-size: ${({ theme }: PropsInterface) => theme.size.xxl};
    cursor: pointer;
  }
`;

export const StyledScrollWrapper = styled.div`
  margin-top: 30px;
  overflow-y: auto;

  h1 {
    margin-top: -20px;
  }
`;
