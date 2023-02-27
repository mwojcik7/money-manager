import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  overflow: hidden;

  label {
    margin: ${({ type }) => (type === 'color' ? 0 : '0 0 5px')};
    z-index: 1;
  }

  input[type='text'],
  input[type='date'],
  input[type='number'] {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};

    :focus {
      outline: none;
    }
  }

  input[type='date'] {
    &::-webkit-inner-spin-button {
      display: none;
    }

    &::-webkit-calendar-picker-indicator {
      height: 10px;
      background: ${({ theme }) => theme.colors.darkGrey};
    }
  }
`;

export const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin-bottom: 5px;
`;
