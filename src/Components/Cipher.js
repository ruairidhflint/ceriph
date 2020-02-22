import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Cipher() {
  return (
    <CipherContainer>
      <p>
        Enter a private key and a message to encrypt or decode a message. Only
        you and those with the key will be able to decode the message
        successfully.
      </p>{' '}
      <Link to="/about"> Read more</Link>
      <div className="inputs">
        <input type="text" placeholder="Enter key here" />
        <input type="text" placeholder="Enter message to be encoded" />
      </div>
      <div className="buttons">
        <button>Encode</button>
        <button>Decode</button>
      </div>
      <div className="result">
      </div>
    </CipherContainer>
  );
}

const CipherContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p,
  a {
    font-family: ${props => props.theme.textFont};
    text-align: center;
    font-size: 1rem;
    line-height: 21px;
  }

  a {
    text-decoration: none;
    border-bottom: ${props => props.theme.accentColor} 0.065rem solid;
    color: ${props => props.theme.fontColor};
    transition: color 0.3s ease-in-out;
    font-size: 0.9rem;

    :hover {
      transition: all 0.3s ease-in-out;
      color: ${props => props.theme.accentColor};
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    input {
      width: 85%;
      height: 3rem;
      margin-bottom: 1rem;
      background-color: inherit;
      border: none;
      border-bottom: 1px solid ${props => props.theme.fontColor};
      text-align: center;
      font-size: 1rem;
      transition: border-bottom 0.3s ease-in-out;
      color: ${props => props.theme.fontColor};

      :hover {
        transition: border-bottom 0.3s ease-in-out;
        border-bottom: 1px solid ${props => props.theme.accentColor};
      }

      :focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.accentColor};
        transition: border-bottom 0.3s ease-in-out;
      }
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;

    button {
      width: 6.7rem;
      height: 2.1rem;
      background-color: inherit;
      color: ${props => props.theme.fontColor};
      transition: all 0.2s ease-in-out;
      font-family: ${props => props.theme.serifFont};
      font-size: 0.9rem;
      margin: 0 1rem;
      letter-spacing: 0.1rem;
      cursor: pointer;
      font-weight: lighter;
      opacity: 0.88;

      :hover {
        color: ${props => props.theme.accentColor};
        border: 1px solid ${props => props.theme.accentColor};
        opacity: 1;
        transition: all 0.2s ease-in-out;
      }

      :focus {
          outline: none;
      }
    }
  }

  .result {
    width: 100%;
    // height: 126px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-family: ${props => props.theme.serifFont};
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;

export default Cipher;
