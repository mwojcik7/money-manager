import styled, { keyframes } from 'styled-components';

const shrinkAnimation = keyframes`
  from {
    transform: translateX(-50%) scaleX(1);
  }
  to {
    transform: translateX(-50%) scaleX(0);
  }
`;

const slideAnimation = keyframes`
  from {
    transform: translateX(-800%) translateY(0);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateY(0);
  background-color: ${({ theme }) => theme.colors.darkGrey};
  padding: 25px 25px 15px;
  color: ${({ theme }) => theme.colors.red};
  border: 3px solid ${({ theme }) => theme.colors.red};
  border-radius: 15px;
  animation: ${slideAnimation} 1s ease-in-out 1 forwards, ${slideAnimation} 1s 6s linear 1 reverse forwards;
  z-index: 3;

  h3 {
    color: ${({ theme }) => theme.colors.red};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.red};
    opacity: 0.8;
    width: 60px;
    height: 5px;
    border-radius: 50px;
  }

  &::before {
    opacity: 0.5;
  }

  &::after {
    transform: translateX(-50%) scaleX(1);
    transform-origin: left top;
    animation: ${shrinkAnimation} 5s 1s linear 1 forwards;
  }
`;
