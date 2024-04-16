import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.otf') format('opentype'),
         url('/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  /* 전역 스타일을 작성합니다. */
  body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
