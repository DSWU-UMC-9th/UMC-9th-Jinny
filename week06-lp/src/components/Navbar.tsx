import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { accessToken } = useAuth();

  return (
    <nav className="bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link to={"/"} className="text-xl font-bold text-white">
          LP
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link to={"/login"} className="text-gray-300 hover:text-gray-100">
                로그인
              </Link>
              <Link to={"/signup"} className="text-gray-300 hover:text-gray-100">
                회원가입
              </Link>
            </>
          )}

          {accessToken && (
            <>
              <Link to={"/mypage"} className="text-gray-300 hover:text-gray-100">
                마이페이지
              </Link>
              <Link to={"/search"} className="text-gray-300 hover:text-gray-100">
                검색
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
