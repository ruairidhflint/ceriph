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
    font-size: 1.1rem;
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
`;

export default Cipher;
