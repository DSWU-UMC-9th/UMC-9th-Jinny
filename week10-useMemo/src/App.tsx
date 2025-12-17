import { useMemo, useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import { findPrimeNumbers } from "./utils/math";

// useMemo
// 역할: 연산 결과를 캐싱 (값)
// 언제 사용?: 비싼 연산 작업 (배열 정렬, 필터링, 복잡한 계산) 최적화할 때 사용

function App() {
  console.log("rendered");

  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>useMemo</h1>

      <label>
        숫자 입력 (소수 찾기):{" "}
        <input value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      </label>

      <h2>소수 리스트:</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {primes.map((prime) => (
          <div key={prime}>{prime}&nbsp;</div>
        ))}
      </div>

      <label style={{ display: "flex" }}>
        {text}
        다른 입력 테스트: <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}

export default App;
