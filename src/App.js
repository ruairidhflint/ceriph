import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';

import Cipher from './Components/Cipher';
import About from './Components/About';
import Result from './Components/Result';

import { validator } from './helpers/errorHelper';

function App() {
  const [inputValues, setInputValues] = useState({
    key: '',
    message: '',
    error: false,
  });

  const changeHandler = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submit = () => {
    setInputValues({ ...inputValues, error: false });
    const result = validator(inputValues);

    if (result) {
      console.log(result);
    } else {
      setInputValues({ ...inputValues, error: true });
    }
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
              render={props => (
                <Cipher
                  {...props}
                  inputValues={inputValues}
                  changeHandler={changeHandler}
                  submit={submit}
                />
              )}
            />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/result"
              render={props => (
                <Result
                  {...props}
                  inputValues={inputValues}
                />
              )}
            />
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
