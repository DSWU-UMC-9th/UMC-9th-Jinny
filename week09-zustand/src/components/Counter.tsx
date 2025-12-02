import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

const Counter = () => {
  // 개별구독 or useShallow 사용
  const { count } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
    }))
  );

  // const count = useCounterStore((state) => state.count); 개별 구독
  // const increment = useCounterStore((state) => state.actions.increment);

  return (
    <div>
      <h1>{count}</h1>
      <CounterButton />
    </div>
  );
};

export default Counter;
