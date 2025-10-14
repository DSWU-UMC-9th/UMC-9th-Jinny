import useToggle from "../hooks/useToggle";

const Toggle2 = () => {
  const [isOpen, toggle] = useToggle(true);

  return (
    <>
      <h1>{isOpen ? "open2" : "close2"}</h1>
      <button onClick={toggle}>toggle</button>
    </>
  );
};

export default Toggle2;
