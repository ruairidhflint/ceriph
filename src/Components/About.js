import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { aboutText } from '../helpers/text';

function About() {
  return (
    <AboutContainer>
      <div className="text">
        <p>{aboutText.paragraph1}</p>
        <p>{aboutText.paragraph2}</p>
        <p>
          Ceriph was built by{' '}
          <a
            href="https://rory.codes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rory Flint
          </a>{' '}
          during a series of one day build projects. Feel free to check out the
          source code{' '}
          <a
            href="https://github.com/ruairidhflint/ceriph"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{' '}
          or get in touch on on{' '}
          <a
            href="https://twitter.com/MrRoryFlint"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
        </p>
      </div>
      <div className="return">
        <Link to="/"> ←</Link>
      </div>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      width: 90%;
      margin-bottom: 1rem;
    }

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
      font-size: 1rem;

      :hover {
        transition: all 0.3s ease-in-out;
        border-bottom: ${props => props.theme.accentColor} 0.065rem solid;
        color: ${props => props.theme.accentColor};
      }

      :focus {
        outline: none;
      }
    }
  }

  .return {
    margin-top: 2rem;
    a {
      border: none;
      font-size: 1.2rem;
      text-decoration: none;
      font-size: 0.9rem;
      color: ${props => props.theme.fontColor};
      :hover {
        transition: all 0.3s ease-in-out;
        color: ${props => props.theme.accentColor};
      }

      :focus {
        outline: none;
      }
    }
  }
`;

export default About;
