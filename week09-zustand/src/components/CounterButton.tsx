import { useCounterActions } from "../stores/counterStore";

const CounterButton = () => {
  // const increment = useCounterStore((state) => state.actions.increment);
  // const decrement = useCounterStore((state) => state.actions.decrement);

  // 가독성이 좋음
  // 다른 상태관리 라이브러리에서도 동일한 패턴 적용 가능
  const { increment, decrement } = useCounterActions();

  return (
    <>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </>
  );
};

export default CounterButton;
