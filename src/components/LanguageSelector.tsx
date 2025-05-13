import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { type FromLanguage, type Language } from "../types";

// interface Props {
//     type: "from" | "to";
//     value: FromLanguage | Language;
//     onChange: (language: FromLanguage | Language) => void;
// }

type Props =
  | {
      type: "from";
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: "to"; value: Language; onChange: (language: Language) => void };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select onChange={handleChange} value={value}>
      {type === "from" && (
        <option value={AUTO_LANGUAGE}>Detect language</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>
  );
};
