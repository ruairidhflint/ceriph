import React, { lazy, useState, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { validator } from "./helpers/errorHelper";
import { messageSubstitution, messageDecoder } from "./helpers/cipherHelpers";
import GlobalStyle from "./styles/globalStyles";
import { Theme } from "./styles/theme";

// Import smaller components directly
import Spinner from "./components/Spinner";
import Cipher from "./components/Cipher";
import { titleText } from "./contants/text";

// Lazy load larger or less frequently used components
const About = lazy(() => import("./components/About"));
const Disclaimer = lazy(() => import("./components/Disclaimer"));
const Result = lazy(() => import("./components/Result"));

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AppContainer>
    <h1>{titleText}</h1>
    <section className="content">{children}</section>
  </AppContainer>
);

function App() {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    key: "",
    message: "",
    error: false,
  });

  const [output, setOutput] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const submit = (type: "encode" | "decode") => {
    setInputValues({ ...inputValues, error: false });
    const result = validator(inputValues);

    if (result) {
      const code =
        type === "decode"
          ? messageSubstitution(result.message, result.key)
          : messageDecoder(result.message, result.key);
      setOutput(code);
      navigate("/result");
    } else {
      setInputValues({ ...inputValues, error: true });
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div className="container">
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Cipher
                  inputValues={inputValues}
                  changeHandler={changeHandler}
                  submit={submit}
                />
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/disclaimer"
              element={
                <Suspense fallback={<Spinner />}>
                  <Disclaimer />
                </Suspense>
              }
            />
            <Route
              path="/result"
              element={
                <Suspense fallback={<Spinner />}>
                  <Result inputValues={inputValues} output={output} />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  border: 1px solid ${(props) => props.theme.backgroundColor};
  width: 600px;
  height: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;
    border: none;
    padding: 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .content {
      padding: 0 10px;
    }
  }
`;

export default App;
