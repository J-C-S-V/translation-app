import { Form } from "react-bootstrap";

interface Props {
  type: "from" | "to";
  isLoading?: boolean;
  onChange: (value: string) => void;
  value: string;
  autofocus?: boolean;
}

const getPlaceholder = ({
  type,
  isLoading,
}: {
  type: "from" | "to";
  isLoading?: boolean;
}) => {
  if (type === "from") {
    return "Enter text";
  } else if (isLoading === true) {
    return "Translating...";
  } else {
    return "Translation";
  }
};

export const TextArea = ({
  type,
  autofocus,
  isLoading,
  value,
  onChange,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  return (
    <Form.Control
      autoFocus={type === "from" && autofocus}
      as="textarea"
      rows={7}
      placeholder={getPlaceholder({ type, isLoading })}
      value={value}
      onChange={handleChange}
      disabled={type === "to"}
    />
  );
};
