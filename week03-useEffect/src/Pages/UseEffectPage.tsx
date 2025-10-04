import { useEffect, useState } from "react";

const UseEffectPage = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);

    console.log("useState", count);
  };

  useEffect(() => {
    // 실행하고 싶은 코드
    console.log("useEffect", count);

    // 무한 렌더링 사태가 일어남
    // 보통 useEffect 안에서 setCount... 사용하지 않음!
    // setCount((prev) => prev + 1);

    // (optional) return function
    // cleanup function
    return () => {
      console.log("cleanup function");
    };

    // 의존성 배열 (dependency array)
  }, [count]);

  return (
    <div>
      <h3>useEffectPage</h3>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
    </div>
  );
};

export default UseEffectPage;
