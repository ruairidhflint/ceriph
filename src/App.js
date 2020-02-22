import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { Theme } from './styles/theme';
import { messageSubstitution, messageDecoder } from './Helpers';

import MainContainer from './Components/MainContainer';

function App() {
  const [inputValues, setInputValues] = useState({ key: '', message: '' });
  const [output, setOutput] = useState('');

  const encode = () => {
    const result = messageSubstitution(inputValues.message, inputValues.key);
    setOutput(result)
  }

  const decode = () => {
    const result = messageDecoder(inputValues.message, inputValues.key);
    setOutput(result)
  }

  const changeHandler = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <MainContainer
          inputValues={inputValues}
          changeHandler={changeHandler}
          output={output}
          encode={encode}
          decode={decode}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
