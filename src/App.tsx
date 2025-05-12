import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { IconArrow } from "./components/icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";

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
