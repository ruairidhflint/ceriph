import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';

import Cipher from './Components/Cipher';
import About from './Components/About';
import Disclaimer from './Components/Disclaimer';
import Result from './Components/Result';

import { validator } from './helpers/errorHelper';
import { messageSubstitution, messageDecoder } from './helpers/cipherHelpers';

function App(props) {
  const [inputValues, setInputValues] = useState({
    key: '',
    message: '',
    error: false,
  });

  const [output, setOutput] = useState('');

  const changeHandler = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submit = type => {
    console.log(inputValues.message.length)
    setInputValues({ ...inputValues, error: false });
    const result = validator(inputValues);

    if (result) {
      if (type === 'decode') {
        const code = messageSubstitution(result.message, result.key);
        setOutput(code);
      } else if (type === 'encode') {
        const code = messageDecoder(result.message, result.key);
        setOutput(code);
      }
      props.history.push('/result')
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
            <Route path="/disclaimer" component={Disclaimer} />
            <Route
              exact
              path="/result"
              render={props => <Result {...props} inputValues={inputValues} output={output} />}
            />
          </section>
        </AppContainer>
      </div>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  border: 1px solid ${props => props.theme.backgroundColor};
  width: 600px;
  height: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
  }
`;

export default withRouter(App);
