import styled from "styled-components";

type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <ToggleButton
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? "☀" : "☾"}
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  position: fixed;
  top: 1.2rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  padding: 0.3rem;
  z-index: 10;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.accentColor};
    outline-offset: 2px;
  }
`;
