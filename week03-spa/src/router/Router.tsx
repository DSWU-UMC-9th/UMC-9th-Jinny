import { useEffect, useState } from "react";
import { FirstPage, FourthPage, HomePage, SecondPage, ThirdPage } from "../App";

const Router = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState); // popstate 이벤트 감지 시 pathname 상태 업데이트
  }, []);

  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/first":
      return <FirstPage />;
    case "/second":
      return <SecondPage />;
    case "/third":
      return <ThirdPage />;
    case "/fourth":
      return <FourthPage />;
    default:
      return <h1>404</h1>;
  }
};

export default Router;
