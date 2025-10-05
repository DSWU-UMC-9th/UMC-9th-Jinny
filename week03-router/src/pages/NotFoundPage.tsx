import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>페이지를 찾을 수 없어요(404)</h1>
      <button>
        <Link to={"/"}>홈으로</Link>
      </button>
    </>
  );
};

export default NotFoundPage;
