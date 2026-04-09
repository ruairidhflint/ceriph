import { useState } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useScrambleReveal } from "../hooks/useScrambleReveal";

type ResultProps = {
  secretKey: string;
  output: string;
  cipherId: string;
  cipherName: string;
  type: "encode" | "decode";
};

export function Result({
  secretKey,
  output,
  cipherId,
  cipherName,
  type,
}: ResultProps) {
  const [copied, setCopied] = useState(false);
  const displayed = useScrambleReveal(output, 800);

  if (!output) {
    return <Navigate to="/" />;
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareUrl = () => {
    const params = new URLSearchParams({
      cipher: cipherId,
      msg: btoa(output),
      ...(secretKey && { key: btoa(secretKey) }),
    });
    return `${window.location.origin}/share?${params.toString()}`;
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ResultContainer>
      <p>
        {type === "encode" ? (
          <>
            Below is your encoded message
            {secretKey && (
              <>
                . Only those with the secret key{" "}
                <span>{secretKey}</span> will be able to decode it
              </>
            )}
            .
          </>
        ) : (
          <>Your decoded message is below.</>
        )}
      </p>
      <p className="cipher-label">
        Cipher: <span>{cipherName}</span>
      </p>
      <Link to="/disclaimer">Disclaimer</Link>
      <div className="output">
        <p>{displayed}</p>
      </div>
      <div className="actions">
        <button onClick={copyToClipboard} aria-label="Copy to clipboard">
          {copied ? "Copied!" : "Copy"}
        </button>
        {type === "encode" && (
          <button onClick={copyShareLink} aria-label="Copy share link">
            Share
          </button>
        )}
      </div>
      <div className="return">
        <Link to="/" aria-label="Go back">
          ←
        </Link>
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
    font-family: ${(props) => props.theme.textFont};
    text-align: center;
    font-size: 1rem;
    line-height: 21px;

    span {
      color: ${(props) => props.theme.accentColor};
    }
  }

  .cipher-label {
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
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

  .output {
    margin-top: 0.2rem;
    min-height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-family: ${(props) => props.theme.serifFont};
      font-size: 2.2rem;
      line-height: 2.2rem;
      width: 100%;
      word-break: break-all;

      &::selection {
        background-color: ${(props) => props.theme.accentColor};
      }

      @media (max-width: 601px) {
        width: 95%;
      }
    }
  }

  .actions {
    margin-bottom: 0.5rem;
    display: flex;
    gap: 0.6rem;

    button {
      background: none;
      border: 1px solid ${(props) => props.theme.fontColor};
      color: ${(props) => props.theme.fontColor};
      padding: 0.35rem 1.2rem;
      font-family: ${(props) => props.theme.serifFont};
      font-size: 0.8rem;
      letter-spacing: 0.1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      min-width: 5.5rem;

      &:hover {
        color: ${(props) => props.theme.accentColor};
        border-color: ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
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
