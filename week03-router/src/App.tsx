import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";

// 경로(path)와 화면(element) 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈 페이지</h1>,
  },
  { path: "/movies", element: <h1>영화 페이지</h1> },
  {
    path: "*",
    element: (
      <>
        <h1>페이지를 찾을 수 없어요(404)</h1>
        <button>
          <Link to={"/"}>홈으로</Link>
        </button>
      </>
    ),
  },
]);

// RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
