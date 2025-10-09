import { useState } from "react";

const Toggle2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1>{isOpen ? "open2" : "close2"}</h1>
      <button onClick={() => setIsOpen(!isOpen)}>toggle</button>
    </>
  );
};

export default Toggle2;
