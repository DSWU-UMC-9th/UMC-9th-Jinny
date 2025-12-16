import { useState } from "react";
import "./App.css";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = (number: number) => {
    setCount(count + number);
  };

  const handleText = (text: string) => {
    setText(text);
  };

  return (
    <>
      <h1>useCallback</h1>

      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />

      <h2>Text: {text}</h2>
      <TextInput onChange={handleText} />
    </>
  );
}

export default App;
