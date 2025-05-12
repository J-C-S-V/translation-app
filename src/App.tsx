import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer } from "react";
import { type Action, type State } from "./types";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  isLoading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;

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
      toLanguage: action.payload,
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      toLanguage: true,
      fromLanguage: action.payload,
    };
  }
  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      isLoading: false,
      result: action.payload,
    };
  }

  return state;
}

function App() {
  const [{ fromLanguage }, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Translation app</h1>
      <button
        onClick={() => {
          dispatch({ type: "SET_FROM_LANGUAGE", payload: "es" });
        }}
      >
        Change to Spanish
        {" " + fromLanguage}
      </button>
    </div>
  );
}

export default App;
