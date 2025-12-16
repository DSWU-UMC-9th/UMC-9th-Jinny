interface CountButtonProps {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: CountButtonProps) => {
  console.log("CountButton rendered");

  return <button onClick={() => onClick(10)}>카운트 증가</button>;
};

export default CountButton;
