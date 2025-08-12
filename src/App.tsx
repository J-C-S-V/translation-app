import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
// import { AUTO_LANGUAGE } from "./constants";
// import { LanguageSelector } from "./components/LanguageSelector";
// import { TextArea } from "./components/TextArea";
import { useReducer } from "react";

const initialState = { count: 0 };

const TYPES = {
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  INCREMENT: "INCREMENT",
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.DECREMENT:
      return { count: state.count - action.payload };
    case TYPES.RESET:
      return initialState;
    case TYPES.INCREMENT:
      return { count: state.count + action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClickDecrementFive = () => {
    dispatch({ type: TYPES.DECREMENT, payload: 5 });
  };
  const handleClickDecrementOne = () => {
    dispatch({ type: TYPES.DECREMENT, payload: 1 });
  };
  const handleClickReset = () => {
    dispatch({ type: TYPES.RESET });
  };

  const handleClickIncrementOne = () => {
    dispatch({ type: TYPES.INCREMENT, payload: 1 });
  };
  const handleClickIncrementFive = () => {
    dispatch({ type: TYPES.INCREMENT, payload: 5 });
  };

  return (
    <>
      <h1>Counter</h1>
      <main>
        <button onClick={handleClickDecrementFive}>Decrement -5</button>
        <button onClick={handleClickDecrementOne}>Decrement</button>
        <button onClick={handleClickReset}>Reset</button>
        <button onClick={handleClickIncrementOne}>Increment</button>
        <button onClick={handleClickIncrementFive}>Increment +5</button>
        <div>{state.count}</div>
      </main>
    </>
  );
}

export default App;
