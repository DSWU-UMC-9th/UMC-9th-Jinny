import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/mypage.svg";
import { useAuth } from "../context/AuthContext";
import { Settings } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import type { RequestPatchUserDto } from "../types/auth";
import usePatchUser from "../hooks/mutations/usePatchUser";

const MyPage = () => {
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");

  const { data } = useGetMyInfo(accessToken);

  const { mutate } = usePatchUser();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = ({ name, bio, avatar }: RequestPatchUserDto) => {
    mutate({ name, bio, avatar });
  };

  return (
    <div className="flex justify-center items-center w-full h-full px-[40px]">
      <div className="flex flex-col gap-8 max-w-[500px] py-[40px] rounded-xl w-full items-center justify-center shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 relative">
        {edit && (
          <button
            onClick={() => {
              setEdit((prev) => !prev);
              handleSubmit({ name: nameInput, bio: bioInput });
            }}
            className="absolute right-5 top-3 cursor-pointer text-gray-500 hover:text-gray-700 cursor-pointer px-1"
          >
            수정 완료
          </button>
        )}
        {!edit && (
          <Settings
            onClick={() => {
              setEdit((prev) => !prev);
              setNameInput(data?.data.name ?? "");
              setBioInput(data?.data.bio ?? "");
            }}
            className="absolute right-5 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}

        <div className="flex flex-col gap-2 items-center justify-between">
          <img
            src={data?.data.avatar || ProfileIcon}
            alt="프로필 이미지"
            className="w-[100px]"
          />

          {!edit && (
            <>
              <h1 className="font-bold text-lg">
                {data?.data.name} <span className="font-medium">님</span>
              </h1>
            </>
          )}

          {edit && (
            <div className="my-5 flex flex-col gap-5 items-center">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={5}
                className="w-[50%] text-center border-b-2 border-gray-300 outline-none"
              />

              <input
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="한 줄 소개를 입력해주세요."
                className="w-[120%] text-center border-b-2 border-gray-300 outline-none"
              />
            </div>
          )}

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
