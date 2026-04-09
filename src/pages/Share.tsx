import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { getCipher } from "../ciphers";
import { useScrambleReveal } from "../hooks/useScrambleReveal";

export function Share() {
  const [params] = useSearchParams();
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  const cipherId = params.get("cipher") || "keyword";
  const key = params.get("key") ? atob(params.get("key")!) : "";
  const msg = params.get("msg") ? atob(params.get("msg")!) : "";

  const displayed = useScrambleReveal(decoded, 800);

  useEffect(() => {
    if (!msg) {
      setError("No message found in this link.");
      return;
    }

    try {
      const cipher = getCipher(cipherId);
      const result = cipher.decode(msg, key);
      setDecoded(result);
    } catch {
      setError("Could not decode this message.");
    }
  }, [cipherId, key, msg]);

  return (
    <ShareContainer>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p className="label">Someone sent you an encoded message:</p>
          <div className="output">
            <p>{displayed}</p>
          </div>
          <p className="meta">
            Cipher: <span>{getCipher(cipherId).name}</span>
          </p>
        </>
      )}
      <div className="return">
        <Link to="/" aria-label="Go back">
          Try it yourself →
        </Link>
      </div>
    </ShareContainer>
  );
}

const ShareContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .label {
    font-family: ${(props) => props.theme.textFont};
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .output {
    min-height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-family: ${(props) => props.theme.serifFont};
      font-size: 2.2rem;
      line-height: 2.2rem;
      word-break: break-all;

      &::selection {
        background-color: ${(props) => props.theme.accentColor};
      }
    }
  }

  .meta {
    font-family: ${(props) => props.theme.textFont};
    font-size: 0.8rem;
    opacity: 0.5;

    span {
      color: ${(props) => props.theme.accentColor};
    }
  }

  .error {
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.errorColor};
    font-size: 1rem;
  }

  .return {
    margin-top: 2rem;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.fontColor};
      font-family: ${(props) => props.theme.textFont};
      font-size: 0.9rem;
      border-bottom: ${(props) => props.theme.underlineColor} 0.025rem solid;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
      }
    }
  }
`;
