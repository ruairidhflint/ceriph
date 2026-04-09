import styled from "styled-components";
import { Link } from "react-router-dom";
import { HistoryEntry } from "../hooks/useHistory";

type Props = {
  entries: HistoryEntry[];
  onClear: () => void;
};

export function History({ entries, onClear }: Props) {
  return (
    <HistoryContainer>
      <h2>History</h2>
      {entries.length === 0 ? (
        <p className="empty">No history yet.</p>
      ) : (
        <>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <span className="cipher">{entry.cipherName}</span>
                <span className="type">{entry.type}</span>
                {entry.keyHint && (
                  <span className="key">key: {entry.keyHint}</span>
                )}
                <span className="output">{entry.output}</span>
                <span className="time">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
          <button className="clear" onClick={onClear}>
            Clear history
          </button>
        </>
      )}
      <div className="return">
        <Link to="/" aria-label="Go back">
          ←
        </Link>
      </div>
    </HistoryContainer>
  );
}

const HistoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: ${(props) => props.theme.serifFont};
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    letter-spacing: 0.1rem;
  }

  .empty {
    font-family: ${(props) => props.theme.textFont};
    font-size: 0.9rem;
    opacity: 0.5;
  }

  ul {
    width: 90%;
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: baseline;
    padding: 0.6rem 0;
    border-bottom: 1px solid ${(props) => props.theme.mutedColor ?? "rgba(255,255,255,0.15)"};
    font-family: ${(props) => props.theme.textFont};
    font-size: 0.8rem;

    .cipher {
      color: ${(props) => props.theme.accentColor};
      font-weight: 500;
    }

    .type {
      opacity: 0.5;
      text-transform: uppercase;
      font-size: 0.65rem;
      letter-spacing: 0.05rem;
    }

    .key {
      opacity: 0.4;
      font-size: 0.75rem;
    }

    .output {
      font-family: ${(props) => props.theme.serifFont};
      flex: 1;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      opacity: 0.3;
      font-size: 0.7rem;
    }
  }

  .clear {
    margin-top: 1rem;
    background: none;
    border: none;
    color: ${(props) => props.theme.errorColor};
    font-family: ${(props) => props.theme.textFont};
    font-size: 0.75rem;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: 2px solid ${(props) => props.theme.accentColor};
      outline-offset: 2px;
    }
  }

  .return {
    margin-top: 1.5rem;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.fontColor};
      font-size: 0.9rem;
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
