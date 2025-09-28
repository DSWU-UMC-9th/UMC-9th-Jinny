import { useCount } from "../context/CounterProvider";
import Button from "./Button";

const ButtonGroup = () => {
  const { handleDecrement, handleIncrement } = useCount();

  return (
    <div>
      <Button onClick={handleIncrement} text="+1 증가" />
      <Button onClick={handleDecrement} text="-1 감소" />
    </div>
  );
};

export default ButtonGroup;
