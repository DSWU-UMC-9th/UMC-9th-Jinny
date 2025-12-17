import { memo } from "react";

interface CountButtonProps {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: CountButtonProps) => {
  console.log("CountButton rendered");

  return <button onClick={() => onClick(10)}>카운트 증가</button>;
};

export default memo(CountButton);

// props가 변경되지 않으면 리렌더링되지 않음
