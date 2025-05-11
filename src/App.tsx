import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer } from "react";

const initialState = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  isLoading: false,
};

function reducer(state, action) {
  const { type, payload } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: payload,
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      toLanguage: true,
      fromLanguage: payload,
    };
  }
  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      fromText: payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      isLoading: false,
      result: payload,
    };
  }

  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
