import useToggle from "../hooks/useToggle";

const Toggle = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <h1>{isOpen ? "open" : "close"}</h1>
      <button onClick={toggle}>toggle</button>
    </>
  );
};

export default Toggle;
