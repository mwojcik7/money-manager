import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    font-family: 'Ubuntu', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.white};
  }
  
  a, button {
    font-family: 'Ubuntu', sans-serif;
  }

  *::-webkit-scrollbar {
    width: 15px;
    background-color: transparent;
    border-radius: 15px;
  }
  
  *::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 15px;
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grey};
    border: 3px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }
`;
