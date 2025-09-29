import { useState } from "react";
import type { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  hoverButtonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  hoverButtonColor,
  onClick,
}: TodoListProps) => {
  const [isHover, setIsHover] = useState<{ id: number; hover: boolean }>();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="render-container__item">
              <p className="render-container__item-text">{todo.text}</p>
              <button
                onClick={() => onClick(todo)}
                style={{
                  backgroundColor:
                    todo.id === isHover?.id && isHover.hover
                      ? hoverButtonColor
                      : buttonColor,
                }}
                className="render-container__item-button"
                onMouseOver={() => setIsHover({ id: todo.id, hover: true })}
                onMouseOut={() => setIsHover({ id: todo.id, hover: false })}
              >
                {buttonLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
