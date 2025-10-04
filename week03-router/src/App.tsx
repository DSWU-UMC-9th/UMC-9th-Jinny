import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// 경로(path)와 화면(element) 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈 페이지</h1>,
  },
  { path: "/movies", element: <h1>영화 페이지</h1> },
]);

// RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
