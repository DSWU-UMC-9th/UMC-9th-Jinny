import { useCallback, useState } from "react";
import "./App.css";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },
    // 빈 배열 -> 이 함수가 처음 한 번만 만들어져야 한다.
    // 함수 내부에서 count 값은 useState 초기값인 0으로 기억
    // 두 번째 클릭을 해도 0+10이 되어 count 값이 변하지 않음
    // 첫 번째 클릭도 0+10
    // 두 번째 클릭도 0+10
    // -> 계속 10만 출력됨
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <>
      <h1>useCallback</h1>

      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />

      <h2>Text: {text}</h2>
      <TextInput onChange={handleText} />
    </>
  );
}

export default App;

// 의존성 배열을 신중하게 설정
// 만약 count를 넣지 않으면 최신 값이 반영되지 않을 수 있음
// 너무 많은 변수를 넣은 경우는 최적화 효과가 사라질 수 있음

// useCallback TradeOff
// useCallback으로 함수가 메모리가 저장되기 때문에 메모리를 많이 사용하게 됨
// 정말 필요할 때 사용하기
