import { Form } from "react-bootstrap";

interface Props {
  type: "from" | "to";
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
  autofocus?: boolean;
}

const getPlaceholder = ({
  type,
  loading,
}: {
  type: "from" | "to";
  loading?: boolean;
}) => {
  if (type === "from") {
    return "Enter text";
  } else if (loading === true) {
    return "Translating...";
  } else {
    return "Translation";
  }
};

export const TextArea = ({
  type,
  autofocus,
  loading,
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
      rows={3}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      onChange={handleChange}
      disabled={loading}
    />
  );
};
