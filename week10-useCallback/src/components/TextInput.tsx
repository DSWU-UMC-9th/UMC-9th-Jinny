import { memo } from "react";

interface TextInputProps {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: TextInputProps) => {
  console.log("TextInput rendered");

  return <input type="text" onChange={(e) => onChange(e.target.value)}></input>;
};

export default memo(TextInput);
