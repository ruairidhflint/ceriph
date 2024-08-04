import styled from "styled-components";
import { Link } from "react-router-dom";
import { disclaimerText } from "../contants/text";

function Disclaimer() {
  return (
    <DisclaimerContainer>
      <div className="text">
        <p>{disclaimerText.paragraph1}</p>
        <p>{disclaimerText.paragraph2}</p>
        <p>
          {disclaimerText.paragraph3}
          <a
            href="https://en.wikipedia.org/wiki/Substitution_cipher"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Wikipedia.
          </a>
        </p>
      </div>
      <div className="return">
        <Link to="/"> ←</Link>
      </div>
    </DisclaimerContainer>
  );
}

const DisclaimerContainer = styled.div`
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
      font-family: ${(props) => props.theme.textFont};
      text-align: center;
      font-size: 1rem;
      line-height: 21px;
    }

    a {
      text-decoration: none;
      border-bottom: ${(props) => props.theme.accentColor} 0.065rem solid;
      color: ${(props) => props.theme.fontColor};
      transition: color 0.3s ease-in-out;
      font-size: 1rem;

      &:hover {
        transition: all 0.3s ease-in-out;
        border-bottom: ${(props) => props.theme.accentColor} 0.065rem solid;
        color: ${(props) => props.theme.accentColor};
      }

      &:focus {
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
      color: ${(props) => props.theme.fontColor};
      &:hover {
        transition: all 0.3s ease-in-out;
        color: ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

export default Disclaimer;
