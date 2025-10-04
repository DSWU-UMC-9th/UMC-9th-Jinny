import { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import MoviePage from "./Pages/MoviePage";
import SearchPage from "./Pages/SearchPage";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log("컴포넌트가 처음 마운트 될 때 실행");
  }, []);

  useEffect(() => {
    // console.log(`count 값이 ${count}로 변경될 때마다 실행`);
  }, [count]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <h1>{count}</h1>
          <button
            onClick={() => {
              setCount((prev) => prev + 1);
            }}
          >
            +1 증가
          </button>
          <button>
            <Link to={"/movies"}>영화 보러 가기</Link>
          </button>
          <button>
            <Link to={"/search"}>클린업 함수 기본 예제</Link>
          </button>
        </>
      ),
    },
    {
      path: "/movies",
      element: <MoviePage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
