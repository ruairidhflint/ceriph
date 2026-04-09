import styled from "styled-components";

export const PageContainer = styled.div`
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
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
      }
    }
  }

  .return {
    margin-top: 2rem;

    a {
      border: none;
      font-size: 0.9rem;
      text-decoration: none;
      color: ${(props) => props.theme.fontColor};

      &:hover {
        transition: all 0.3s ease-in-out;
        color: ${(props) => props.theme.accentColor};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme.accentColor};
        outline-offset: 2px;
      }
    }
  }
`;
