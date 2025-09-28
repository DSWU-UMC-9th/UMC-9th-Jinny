import { useState } from "react";
import "./App.css";

function heavyComputation() {
  let result = 0;

  for (let i = 0; i < 1_000_00000; i++) {
    result += i;
  }

  return result;
}

function App() {
  const [count, setCount] = useState<number>(0);

  const handleIncreaseNumber = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const [person, setPerson] = useState({
    name: "김진효",
    age: 23,
    nickname: "지니",
    city: "",
  });

  // person 객체의 city 업데이트
  const updateCity = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, // 기존 상태 복사
      city: "서울", // city 값만 덮어쓰기
    }));
  };

  // person 객체의 age 1 증가
  const increaseAge = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, // 기존 상태 복사
      age: prevPerson.age + 1, // age만 1 더함
    }));
  };

  // const [count2, setCount2] = useState(heavyComputation());
  // const [count2, setCount2] = useState(() => heavyComputation());
  const [count2, setCount2] = useState(heavyComputation);

  const handleIncrease = () => {
    setCount2((prev) => prev + 1);

    // console.log(count2);
  };

  const handleDecrease = () => {
    setCount2((prev) => prev - 1);
  };

  console.log(heavyComputation());

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncreaseNumber}>숫자 증가</button>

      <hr />

      <h1>이름: {person.name}</h1>
      <h2>나이: {person.age}</h2>
      <h3>닉네임: {person.nickname}</h3>
      {person.city && <h4>도시: {person.city}</h4>}
      <button onClick={updateCity}>도시 추가</button>
      <button onClick={increaseAge}>나이 증가</button>

      <hr />

      <h1>{count2}</h1>
      <button onClick={handleDecrease}>감소</button>
      <button onClick={handleIncrease}>증가</button>
    </>
  );
}

export default App;
