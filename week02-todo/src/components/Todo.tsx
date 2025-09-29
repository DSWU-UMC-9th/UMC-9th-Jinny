import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  // const context = useTodo();
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__todo">TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          hoverButtonColor="#218838"
          onClick={completeTodo}
        />
        <TodoList
          title="할 일"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          hoverButtonColor="#c82333"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
