import { lazy, useState, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { validator } from "./helpers/errorHelper";
import { messageSubstitution, messageDecoder } from "./helpers/cipherHelpers";
import Spinner from "./components/Spinner";
import { titleText } from "./contants/text";
import GlobalStyle from "./styles/globalStyles";
import { Theme } from "./styles/theme";

const Cipher = lazy(() => import("./components/Cipher"));
const About = lazy(() => import("./components/About"));
const Disclaimer = lazy(() => import("./components/Disclaimer"));
const Result = lazy(() => import("./components/Result"));

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

    // Allow only alphabet characters
    let newValue = value.replace(/[^a-zA-Z ]/g, "");

    // Convert to lowercase if the last character is uppercase
    if (newValue.length > 0 && newValue[newValue.length - 1].match(/[A-Z]/)) {
      newValue =
        newValue.slice(0, -1) + newValue[newValue.length - 1].toLowerCase();
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const submit = (type: "encode" | "decode") => {
    setInputValues({ ...inputValues, error: false });
    const result = validator(inputValues);

    if (result) {
      if (type === "decode") {
        const code = messageSubstitution(result.message, result.key);
        setOutput(code);
        navigate("/result");
      } else if (type === "encode") {
        const code = messageDecoder(result.message, result.key);
        setOutput(code);

        navigate("/result");
      } else {
        setInputValues({ ...inputValues, error: true });
      }
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div className="container">
        <Suspense fallback={<Spinner />}>
          <AppContainer>
            <h1>{titleText}</h1>
            <section className="content">
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
                <Route path="/about" element={<About />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route
                  path="/result"
                  element={<Result inputValues={inputValues} output={output} />}
                />
              </Routes>
            </section>
          </AppContainer>
        </Suspense>
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
`;

export default App;
