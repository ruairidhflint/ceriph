import { useState } from "react";
import styled from "styled-components";

const isMac =
  typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent);
const MOD = isMac ? "⌘" : "Ctrl";

export function ShortcutHint() {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Trigger
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
        aria-label="Keyboard shortcuts"
      >
        ?
      </Trigger>
      {visible && (
        <Tooltip>
          <div>
            <kbd>{MOD}</kbd> + <kbd>↵</kbd> Encode
          </div>
          <div>
            <kbd>{MOD}</kbd> + <kbd>⇧</kbd> + <kbd>↵</kbd> Decode
          </div>
          <div>
            <kbd>{MOD}</kbd> + <kbd>⇧</kbd> + <kbd>C</kbd> Copy
          </div>
          <div>
            <kbd>Esc</kbd> Go back
          </div>
        </Tooltip>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 1.2rem;
  right: 1.5rem;
  z-index: 10;
`;

const Trigger = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.mutedColor ?? "rgba(255,255,255,0.3)"};
  color: ${(props) => props.theme.fontColor};
  opacity: 0.4;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  font-family: ${(props) => props.theme.serifFont};
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.accentColor};
    outline-offset: 2px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 2.2rem;
  right: 0;
  background: ${(props) => props.theme.backgroundColor};
  border: 1px solid ${(props) => props.theme.mutedColor ?? "rgba(255,255,255,0.3)"};
  padding: 0.7rem 1rem;
  font-family: ${(props) => props.theme.textFont};
  font-size: 0.7rem;
  line-height: 1.7;
  white-space: nowrap;
  color: ${(props) => props.theme.fontColor};

  kbd {
    font-family: ${(props) => props.theme.textFont};
    opacity: 0.7;
  }
`;
