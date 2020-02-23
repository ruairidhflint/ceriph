import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

function Result({ inputValues, output }) {
  if (!inputValues.key) {
    return <Redirect to="/" />;
  }
  return (
    <ResultContainer>
      <p>
        Below is your coded message. Only those with the the secret key{' '}
        <span>{inputValues.key}</span> will be able to decode the message using
        our decoder.
      </p>
      <Link to="/about">Disclaimer</Link>
      <div className="output">
        <p>{output}</p>
      </div>
      <div className="return">
        <Link to="/"> ←</Link>
      </div>
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 90%;
  }

  p,
  a {
    font-family: ${props => props.theme.textFont};
    text-align: center;
    font-size: 1rem;
    line-height: 21px;

    span {
      color: ${props => props.theme.accentColor};
    }
  }

  a {
    text-decoration: none;
    border-bottom: ${props => props.theme.underlineColor} 0.025rem solid;
    color: ${props => props.theme.fontColor};
    transition: color 0.3s ease-in-out;
    font-size: 0.9rem;

    :hover {
      transition: all 0.3s ease-in-out;
      color: ${props => props.theme.accentColor};
    }

    :focus {
      outline: none;
    }
  }
  .output {
    margin-top: 0.2rem;
    min-height: 220px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-family: ${props => props.theme.serifFont};
      font-size: 2.2rem;
      line-height: 2.2rem;
      width: 100%;
      word-break: break-all;

      ::selection {
        background-color: ${props => props.theme.accentColor};
      }

      @media(max-width: 601px){
        width: 95%;
      }
    }
  }

  .return {
    a {
      border: none;
      font-size: 1.2rem;
    }
  }
`;

export default Result;
