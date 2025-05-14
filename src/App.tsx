import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { IconArrow } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";

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

  useEffect(() => {
    if (fromText === "") return;

    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
        console.log(result);
      })
      .catch(() => {
        setResult("Error: ");
      });
  }, [fromText]);

  return (
    <Container fluid>
      <h1>Translation app</h1>

      <Row>
        <Col>
          <LanguageSelector
            onChange={setFromLanguage}
            type="from"
            value={fromLanguage}
          />
          <TextArea
            type="from"
            value={fromText}
            onChange={setFromText}
            loading={isLoading}
            autofocus={true}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <IconArrow />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            onChange={setToLanguage}
            type="to"
            value={toLanguage}
          />
          <TextArea
            type="to"
            loading={isLoading}
            value={result}
            onChange={setResult}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
