import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/mypage.svg";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
    };

    getData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full px-[40px]">
      <div className="flex flex-col gap-8 max-w-[500px] py-[40px] rounded-xl w-full items-center justify-center shadow-md hover:shadow-xl transition-all duration-500">
        <div className="flex flex-col gap-2 items-center justify-between">
          <img
            src={data?.data.avatar || ProfileIcon}
            alt="프로필 이미지"
            className="w-[100px]"
          />
          <h1 className="font-bold text-lg">
            {data?.data.name} <span className="font-medium">님</span>
          </h1>
          <h1 className="text-gray-600 font-medium">{data?.data.email}</h1>
        </div>

        <div className="w-full max-w-[400px] px-[20px]">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
