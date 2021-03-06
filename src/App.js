import React, { lazy, useState, Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';

import { validator } from './helpers/errorHelper';
import { messageSubstitution, messageDecoder } from './helpers/cipherHelpers';
import { titleText } from './helpers/text';
import Spinner from './Components/Spinner';

const Cipher = lazy(() => import('./Components/Cipher'));
const About = lazy(() => import('./Components/About'));
const Disclaimer = lazy(() => import('./Components/Disclaimer'));
const Result = lazy(() => import('./Components/Result'));

function App(props) {
  const [inputValues, setInputValues] = useState({
    key: '',
    message: '',
    error: false,
  });

  const [output, setOutput] = useState('');

  const changeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submit = (type) => {
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
      props.history.push('/result');
    } else {
      setInputValues({ ...inputValues, error: true });
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div className="container">
        <Suspense fallback={<Spinner />}>
          <AppContainer>
            <h1>{titleText}</h1>
            <section className="content">
              <Route
                exact
                path="/"
                render={(props) => (
                  <Cipher {...props} inputValues={inputValues} changeHandler={changeHandler} submit={submit} />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/disclaimer" component={Disclaimer} />
              <Route
                exact
                path="/result"
                render={(props) => <Result {...props} inputValues={inputValues} output={output} />}
              />
            </section>
          </AppContainer>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  border: 1px solid ${(props) => props.theme.backgroundColor};
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
