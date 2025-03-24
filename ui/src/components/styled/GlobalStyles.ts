import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Arial;
    line-height: 1.5;
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    display: flex;
    min-width: 320px;
    min-height: 100vh;
    width: 100%;
  }

  #root {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
