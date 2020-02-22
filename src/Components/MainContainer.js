import React from 'react';
import styled from 'styled-components';

function MainContainer({ inputValues, changeHandler, output, encode, decode }) {
  return (
    <StyledContainer>
      <div className="container">
        <h1>CERIPH</h1>
        <p>
          Ceriph is a simple application to convert text into ciphertext. The
          keyword you enter will be used to create a unique encryption pattern
          that only those who with the key can decode. Ceriph only supports
          values from the 26 character lowercase English alphabet; any
          additional characters, numbers or casing will be ignored.
        </p>
        <div className="form">
          <h2>Key</h2>
          <input
            type="text"
            name="key"
            onChange={changeHandler}
            placeholder="Enter a single word memorable key"
            value={inputValues.key}
          />
          <h2>Message</h2>
          <input
            type="text"
            name="message"
            onChange={changeHandler}
            placeholder="Enter your message to be encrypted"
            value={inputValues.message}
          />
          <button onClick={encode}>Encode</button><button  onClick={decode}>Decode</button>
        </div>
        <h2>Output</h2>
        <div className="output">
          <p>{output}</p>
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.02);

  .container {
    height: 70%;
    width: 60%;
    background-color: ${props => props.theme.backgroundColor};
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        display: inline-block;
    }

    h1 {
      color: ${props => props.theme.fontColor};
      font-family: 'Roboto Slab';
      font-size: 3rem;
      margin-top: 2rem;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      font-family: 'Roboto';
      font-size: 1rem;
      width: 80%;
      margin-top: 1.2rem;
      text-align: center;
      line-height: 1.2rem;
    }

    h2 {
      color: ${props => props.theme.fontColor};
    }
    .form {
      width: 80%;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;

      input {
        border: none;
        width: 80%;
        height: 40px;
        text-align: center;
        color: ${props => props.theme.fontColor};
        background-color: ${props => props.theme.backgroundColor};
        border: 1px solid ${props => props.theme.fontColor};
        margin: 1rem 0;

        ::placeholder {
          color: darkgrey;
          font-size: 0.8rem;
        }
      }
    }
    .output {
      height: 80px;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid darkgrey;
      margin-top: 0.5rem;

      p {
        color: ${props => props.theme.fontColor};
        font-family: 'Roboto Slab';
        font-size: 1.4rem;
        width: 80%;
        text-align: center;
        margin-top: 0;
      }
    }
  }
`;

export default MainContainer;
