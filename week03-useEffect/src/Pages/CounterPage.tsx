import { useEffect, useState } from "react";

const Parent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <h1>useEffect</h1>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "숨기기" : "보이기"}
      </button>
      {visible && <CounterPage />}
    </>
  );
};

const CounterPage = () => {
  useEffect(() => {
    let i = 0;
    const counterInterval = setInterval(() => {
      console.log("Number", i);
      i++;
    }, 1000);
    console.log("child rendered");

    return () => {
      console.log("unmount");
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <>
      <h2>Child</h2>
    </>
  );
};

export default Parent;
