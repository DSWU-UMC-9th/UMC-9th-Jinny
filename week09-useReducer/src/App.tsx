import { useReducer, useState, type ChangeEvent } from "react";
import "./App.css";

// 1-1. counter state에 대한 interface
interface IState {
  counter: number;
}

// 1-2. counter reducer에 대한 interface
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}

// 2-1. 부서 state에 대한 interface
interface IState2 {
  department: string;
  error: string | null;
}

// 2-2. 부서 reducer에 대한 interface
interface IAction2 {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

// 3-1. counter 상태 업데이트 함수
function reducer(state: IState, action: IAction) {
  const { type, payload = 1 } = action;

  switch (type) {
    case "INCREASE": {
      return {
        ...state, // 원본 값 유지
        counter: state.counter + payload,
      };
    }

    case "DECREASE": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }

    case "RESET_TO_ZERO": {
      return {
        ...state,
        counter: 0,
      };
    }

    default:
      return state;
  }
}

// 3-2. 부서 상태 업데이트 함수
function reducer2(state: IState2, action: IAction2) {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";

      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError ? "거부, 카드메이커만 입력 가능" : null,
      };
    }

    default:
      return state;
  }
}

function App() {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  // 사본을 만들어서 변경시키는 형태
  const [state, dispatch] = useReducer(reducer, {
    counter: 0, // initialState
  });

  const [state2, dispatch2] = useReducer(reducer2, {
    department: "Software Developer",
    error: null,
  });

  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>
        <h2>👉 useState 사용</h2>
        <h3>{count}</h3>
        <button onClick={handleIncrease}>increase</button>
      </div>

      <div>
        <h2>👉 useReducer 사용</h2>
        <h3>{state.counter}</h3>
        <button
          onClick={() =>
            dispatch({
              type: "INCREASE",
              payload: 3,
            })
          }
        >
          increase
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "DECREASE",
            })
          }
        >
          decrease
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
            })
          }
        >
          reset
        </button>
      </div>

      <hr />

      <div>
        <h2>{state2.department}</h2>
        {state2.error && <p>{state2.error}</p>}

        <input
          style={{ width: "500px", padding: "5px" }}
          placeholder="변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
          value={department}
          onChange={handleChangeDepartment}
        />

        <button
          onClick={() =>
            dispatch2({
              type: "CHANGE_DEPARTMENT",
              payload: department,
            })
          }
        >
          직무 변경하기
        </button>
      </div>
    </>
  );
}

export default App;
