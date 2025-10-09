import { useState } from "react";

const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1>{isOpen ? "open" : "close"}</h1>
      <button onClick={() => setIsOpen(!isOpen)}>toggle</button>
    </>
  );
};

export default Toggle;
