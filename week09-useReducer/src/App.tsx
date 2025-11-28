import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1>useReducer</h1>
      <h3>{count}</h3>
      <button onClick={handleIncrease}>increase</button>
    </>
  );
}

export default App;
