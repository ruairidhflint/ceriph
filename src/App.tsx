import React, { useState, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { ciphers, getCipher } from "./ciphers";
import { useHistory } from "./hooks/useHistory";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import GlobalStyle from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

import { Cipher } from "./pages/Cipher";
import { titleText } from "./constants/text";
import { Disclaimer } from "./pages/Disclaimer";
import { About } from "./pages/About";
import { Result } from "./pages/Result";
import { Share } from "./pages/Share";
import { History } from "./pages/History";
import { ThemeToggle } from "./components/ThemeToggle";
import { ShortcutHint } from "./components/ShortcutHint";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AppContainer>
    <h1>{titleText}</h1>
    <section className="content">{children}</section>
  </AppContainer>
);

function App() {
  const navigate = useNavigate();
  const [selectedCipherId, setSelectedCipherId] = useState("keyword");
  const [inputValues, setInputValues] = useState({ key: "", message: "" });
  const [error, setError] = useState<string | false>(false);
  const [output, setOutput] = useState("");
  const [lastType, setLastType] = useState<"encode" | "decode">("encode");
  const { entries, addEntry, clearHistory } = useHistory();

  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("ceriph-theme") !== "light";
    } catch {
      return true;
    }
  });

  const theme = isDark ? darkTheme : lightTheme;
  const selectedCipher = useMemo(
    () => getCipher(selectedCipherId),
    [selectedCipherId]
  );

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("ceriph-theme", next ? "dark" : "light");
      return next;
    });
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "cipher") {
      setSelectedCipherId(value);
      setError(false);
      return;
    }
    const newValue =
      name === "key" && selectedCipher.id === "caesar"
        ? value.replace(/[^0-9]/g, "")
        : value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    setInputValues((prev) => ({ ...prev, [name]: newValue }));
    if (error) setError(false);
  };

  const submit = (type: "encode" | "decode") => {
    setError(false);

    if (selectedCipher.needsKey) {
      const keyError = selectedCipher.keyValidator?.(inputValues.key);
      if (keyError) {
        setError(keyError);
        return;
      }
    }

    const msg = inputValues.message;
    if (msg.length < 1 || msg.length > 256) {
      setError("Message must be between 1 and 256 characters.");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(msg)) {
      setError("Message can only contain letters and spaces.");
      return;
    }

    try {
      const code =
        type === "encode"
          ? selectedCipher.encode(msg, inputValues.key)
          : selectedCipher.decode(msg, inputValues.key);
      setOutput(code);
      setLastType(type);
      addEntry({
        cipherId: selectedCipher.id,
        cipherName: selectedCipher.name,
        type,
        key: inputValues.key,
        output: code,
      });
      navigate("/result");
    } catch {
      setError("Something went wrong processing your message.");
    }
  };

  useKeyboardShortcuts({
    onEncode: () => submit("encode"),
    onDecode: () => submit("decode"),
    onBack: () => navigate("/"),
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <ShortcutHint />
      <div className="container">
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Cipher
                  ciphers={ciphers}
                  selectedCipherId={selectedCipherId}
                  inputValues={inputValues}
                  error={error}
                  changeHandler={changeHandler}
                  submit={submit}
                  hasHistory={entries.length > 0}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route
              path="/result"
              element={
                <Result
                  secretKey={inputValues.key}
                  output={output}
                  cipherId={selectedCipherId}
                  cipherName={selectedCipher.name}
                  type={lastType}
                />
              }
            />
            <Route path="/share" element={<Share />} />
            <Route
              path="/history"
              element={
                <History entries={entries} onClear={clearHistory} />
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
  min-height: 490px;
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
