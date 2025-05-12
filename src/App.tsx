import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { IconArrow } from "./components/icons";

function App() {
  const { interchangeLanguages, toLanguage, fromLanguage } = useStore();

  return (
    <Container fluid>
      <h1>Translation app</h1>

      <Row>
        <Col>
          <h2>From</h2>
          <p>{fromLanguage}</p>
        </Col>
        <Col>
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <IconArrow />
          </Button>
        </Col>
        <Col>
          <h2>to</h2>
          <p>{toLanguage}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
