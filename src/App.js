import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';

import Cipher from './Components/Cipher';
import About from './Components/About';

function App() {
  const [inputValues, setInputValues] = useState({ key: '', message: '' });

  const changeHandler = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div className="container">
        <AppContainer>
          <h1>CERIPH</h1>
          <section className="content">
            <Route
              exact
              path="/"
              render={props => <Cipher {...props} inputValues={inputValues} changeHandler={changeHandler} />}
            />
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
  height: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
  }
`;

export default App;
