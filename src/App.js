import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';

import Cipher from './Components/Cipher';
import About from './Components/About';

import { messageSubstitution, messageDecoder } from './Helpers';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div className="container">
        <AppContainer>
          <h1>CERIPH</h1>
          <section className="content">
            <Route exact path="/" component={Cipher} />
            <Route path="/about" component={About} />
          </section>
        </AppContainer>
      </div>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  // border: 1px solid white;
  width: 600px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
  }
`;

export default App;
