import styled from "styled-components";
import { Link } from "react-router-dom";
import { cipherText } from "../constants/text";
import { CipherDefinition } from "../ciphers";

type CipherProps = {
  ciphers: CipherDefinition[];
  selectedCipherId: string;
  inputValues: {
    key: string;
    message: string;
  };
  error: string | false;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  submit: (type: "encode" | "decode") => void;
  hasHistory: boolean;
};

const MAX_MESSAGE_LENGTH = 256;

export function Cipher({
  ciphers,
  selectedCipherId,
  inputValues,
  error,
  changeHandler,
  submit,
  hasHistory,
}: CipherProps) {
  const charCount = inputValues.message.length;
  const nearLimit = charCount > MAX_MESSAGE_LENGTH * 0.85;
  const overLimit = charCount > MAX_MESSAGE_LENGTH;
  const selectedCipher = ciphers.find((c) => c.id === selectedCipherId)!;

  return (
    <CipherContainer>
      <p>{cipherText}</p>
      <Link to="/about">Continue reading</Link>
      <div className="cipher-select">
        <select
          name="cipher"
          value={selectedCipherId}
          onChange={changeHandler}
          aria-label="Select cipher type"
        >
          {ciphers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="inputs">
        {selectedCipher.needsKey && (
          <input
            type="text"
            name="key"
            value={inputValues.key}
            onChange={changeHandler}
            placeholder={selectedCipher.keyPlaceholder || "Key"}
            aria-label={selectedCipher.keyLabel || "Secret key"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        )}
        <input
          type="text"
          name="message"
          value={inputValues.message}
          onChange={changeHandler}
          placeholder="Message"
          aria-label="Message to encode or decode"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <CharCount $nearLimit={nearLimit} $overLimit={overLimit}>
          {charCount} / {MAX_MESSAGE_LENGTH}
        </CharCount>
      </div>
      <div className="error" role="alert" aria-live="assertive">
        {error && <p>{error}</p>}
      </div>
      <div className="buttons">
        <button onClick={() => submit("encode")}>Encode</button>
        <button onClick={() => submit("decode")}>Decode</button>
      </div>
      {hasHistory && (
        <div className="history-link">
          <Link to="/history">History</Link>
        </div>
      )}
    </CipherContainer>
  );
}

const CharCount = styled.span<{ $nearLimit: boolean; $overLimit: boolean }>`
  font-family: ${(props) => props.theme.textFont};
  font-size: 0.75rem;
  margin-top: 0.4rem;
  opacity: 0.5;
  transition: all 0.2s ease-in-out;
  color: ${(props) =>
    props.$overLimit
      ? props.theme.errorColor
      : props.$nearLimit
        ? props.theme.accentColor
        : props.theme.fontColor};
`;

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
    transition: color 0.3s ease-in-out;
    font-size: 0.9rem;

    &:hover {
      transition: all 0.3s ease-in-out;
      color: ${(props) => props.theme.accentColor};
    }

    &:focus {
      outline: 2px solid ${(props) => props.theme.accentColor};
      outline-offset: 2px;
    }
  }

  .cipher-select {
    margin-top: 1.5rem;

    select {
      background: transparent;
      border: 1px solid ${(props) => props.theme.mutedColor ?? "rgba(255,255,255,0.3)"};
      color: ${(props) => props.theme.fontColor};
      font-family: ${(props) => props.theme.serifFont};
      font-size: 0.85rem;
      padding: 0.35rem 0.8rem;
      cursor: pointer;
      letter-spacing: 0.05rem;
      transition: all 0.2s ease-in-out;

      option {
        background: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.fontColor};
      }

      &:hover {
        border-color: ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
      }
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
        border-bottom: 2px solid ${(props) => props.theme.accentColor};
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
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
      }
    }

    @media (max-width: 400px) {
      flex-direction: column;
      gap: 0.6rem;

      button {
        margin: 0;
      }
    }
  }

  .history-link {
    margin-top: 1rem;

    a {
      font-size: 0.8rem;
      opacity: 0.5;
      border-bottom: none;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
