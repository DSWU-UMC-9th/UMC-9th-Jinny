import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../apis/todo";

const TodoList = () => {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 30_000, // 30초 동안은 fresh로 간주
    gcTime: 5 * 60 * 1000, // 5분 후 사용되지 않는 캐시 정리
    retry: 1, // 실패 시 재시도 회수
    // select: (raw) => raw.filter((t) => !t.completed), // 필요한 형태로 데이터 가공
    placeholderData: [], // 첫 fetch 이전에 잠시 보여줄 값
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "새로고침 중..." : "새로고침"}
      </button>

      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
