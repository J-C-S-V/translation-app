import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    isLoading,
    toLanguage,
    fromLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedText = useDebounce(fromText);

  useEffect(() => {
    if (fromText === "") return;
    if (debouncedText) {
      translate({ fromLanguage, toLanguage, text: fromText })
        .then((result) => {
          if (result == null) return;
          setResult(result);
        })
        .catch(() => {
          setResult("Error: ");
        });
    }
  }, [debouncedText]);

  return (
    <Container fluid className="container">
      <h1>Translation app</h1>

      <Row className="first-row">
        <Col md={5}>
          <LanguageSelector
            onChange={setFromLanguage}
            type="from"
            value={fromLanguage}
          />
          <TextArea
            type="from"
            value={fromText}
            onChange={setFromText}
            autofocus={true}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <svg
              width={24}
              height={24}
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
            </svg>
          </Button>
        </Col>
        <Col md={5}>
          <LanguageSelector
            onChange={setToLanguage}
            type="to"
            value={toLanguage}
          />
          <TextArea
            type="to"
            isLoading={isLoading}
            value={result}
            onChange={setResult}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
