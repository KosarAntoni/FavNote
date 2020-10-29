import { createGlobalStyle } from 'styled-components';
import { theme } from './mainTheme';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.4rem;
    font-family: "Montserrat", sans-serif; 
    padding-bottom: 10rem;
  }
  
      @media screen and ${theme.viewPorts.viewport7} {
        body {
          padding-left: 10rem;
          padding-bottom: 0;
          font-size: 1.6rem;
        }
      }

`;

export default GlobalStyle;
