import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, Search, User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { accessToken } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <nav className="fixed w-full z-10 bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4 items-center">
          <Menu
            onClick={handleShowSidebar}
            className="text-gray-900 cursor-pointer hover:bg-gray-300 hover:rounded-full"
          />
          <Link to={"/"} className="text-xl font-bold text-gray-900">
            LP
          </Link>
        </div>

        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-500 hover:text-gray-900 duration-300"
              >
                Log in
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-500 hover:text-gray-900 duration-300"
              >
                Sign Up
              </Link>
            </>
          )}

          {accessToken && (
            <div className="flex gap-3">
              <Link to={"/mypage"}>
                <User className="hover:bg-gray-300 hover:rounded-full" />
              </Link>
              <Link to={"/search"}>
                <Search className="hover:bg-gray-300 hover:rounded-full" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </nav>
  );
};

export default Navbar;
