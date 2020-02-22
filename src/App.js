import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';
import { messageSubstitution, messageDecoder } from './Helpers';


function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
