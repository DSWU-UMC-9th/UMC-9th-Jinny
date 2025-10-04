import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import RootLayout from "./layout/root-layout";

// 경로(path)와 화면(element) 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movies",
        element: <MoviesPage />,
      },
    ],
  },
]);

// RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
