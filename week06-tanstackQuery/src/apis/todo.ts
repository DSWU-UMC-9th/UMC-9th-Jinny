interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<TodoResponse[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  // 응답에 실패할 경우
  if (!response.ok) {
    throw new Error("fetch 실패");
  }

  // 응답 파싱
  const todos = await response.json();

  return todos;
};
