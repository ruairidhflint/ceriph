import React from "react";
import styled from "styled-components";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;

  h2 {
    font-family: "Roboto Slab", serif;
    font-size: 1.5rem;
  }

  button {
    background: none;
    border: 1px solid currentColor;
    color: inherit;
    padding: 0.5rem 1.5rem;
    font-family: "Roboto Slab", serif;
    font-size: 0.9rem;
    cursor: pointer;
    letter-spacing: 0.1rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #e9b85a;
      border-color: #e9b85a;
    }
  }
`;
