import styled from "styled-components";
import { Link } from "react-router-dom";
import { cipherText, errorMessage } from "../contants/text";

type CipherProps = {
  inputValues: {
    key: string;
    message: string;
    error: boolean;
  };
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (type: "encode" | "decode") => void;
};

function Cipher({ inputValues, changeHandler, submit }: CipherProps) {
  return (
    <CipherContainer>
      <p>{cipherText}</p> <Link to="/about"> Continue reading</Link>
      <div className="inputs">
        <input
          type="text"
          name="key"
          value={inputValues.key}
          onChange={changeHandler}
          placeholder="Keyword"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <input
          type="text"
          name="message"
          value={inputValues.message}
          onChange={changeHandler}
          placeholder="Message"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
      <div className="error">
        <p style={inputValues.error ? { display: "block" } : undefined}>
          {errorMessage}
        </p>
      </div>
      <div className="buttons">
        <button onClick={() => submit("encode")}>Encode</button>
        <button onClick={() => submit("decode")}>Decode</button>
      </div>
      <div className="result"></div>
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
    font-family: ${(props) => props.theme.textFont};
    text-align: center;
    font-size: 1rem;
    line-height: 21px;
  }

  a {
    text-decoration: none;
    border-bottom: ${(props) => props.theme.underlineColor} 0.025rem solid;
    color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.fontColor};
    transition: color 0.3s ease-in-out;
    font-size: 0.9rem;

    &:hover {
      transition: all 0.3s ease-in-out;
      color: ${(props) => props.theme.accentColor};
    }

    &:focus {
      outline: none;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    input {
      width: 85%;
      height: 3rem;
      margin-top: 1rem;
      background-color: inherit;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.fontColor};
      text-align: center;
      font-size: 1rem;
      transition: border-bottom 0.3s ease-in-out;
      color: ${(props) => props.theme.fontColor};

      &:hover {
        transition: border-bottom 0.3s ease-in-out;
        border-bottom: 1px solid ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: none;
        border-bottom: 1px solid ${(props) => props.theme.accentColor};
        transition: border-bottom 0.3s ease-in-out;
      }
    }
  }

  .error {
    min-height: 3rem;
    width: 100%;

    p {
      font-size: 0.8rem;
      width: 85%;
      margin: 0 auto;
      margin-top: 0.8rem;
      line-height: 1rem;
      color: ${(props) => props.theme.errorColor};
      display: none;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.4rem;

    button {
      width: 6.7rem;
      height: 2.1rem;
      background-color: inherit;
      color: ${(props) => props.theme.fontColor};
      transition: all 0.2s ease-in-out;
      font-family: ${(props) => props.theme.serifFont};
      font-size: 0.9rem;
      margin: 0 1rem;
      letter-spacing: 0.1rem;
      cursor: pointer;
      font-weight: lighter;
      opacity: 0.88;
      border: 1px solid ${(props) => props.theme.fontColor};

      &:hover {
        color: ${(props) => props.theme.accentColor};
        border: 1px solid ${(props) => props.theme.accentColor};
        opacity: 1;
        transition: all 0.2s ease-in-out;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .result {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-family: ${(props) => props.theme.serifFont};
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;

export default Cipher;
