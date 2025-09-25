import { useState } from "react";
import "./App.css";

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
    </>
  );
}

export default App;
