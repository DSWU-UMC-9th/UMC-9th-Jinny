import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">TODO</h1>

      <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일을 입력해주세요."
          required
        />
        <button type="submit" className="todo-container__button">
          할일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo) => (
              <li className="render-container__item" key={todo.id}>
                <p className="render-container__item-text">{todo.text}</p>
                <button
                  style={{ backgroundColor: isHover ? "#218838" : "#28a745" }}
                  className="render-container__item-button"
                  onClick={() => completeTodo(todo)}
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map((todo) => (
              <li className="render-container__item" key={todo.id}>
                <p className="render-container__item-text">{todo.text}</p>
                <button
                  className="render-container__item-button"
                  onClick={() => deleteTodo(todo)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
