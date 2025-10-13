import useForm from "../hooks/useForm";
import { validateSignIn, type UserSignInformation } from "../utils/validate";

import GoogleIcon from "../assets/google-logo.png";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } = useForm<UserSignInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignIn,
  });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex text-2xl font-semibold p-3 my-3">
          <p className="cursor-pointer" onClick={() => navigate(-1)}>
            {"<"}
          </p>
          <p className="flex-1 text-center">로그인</p>
        </div>

        <input
          {...getInputProps("email")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.email && touched?.email ? "border-red-500" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        {touched?.email && errors?.email && (
          <div className="text-red-500 text-sm -mt-2">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.password && touched?.password ? "border-red-500" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        {touched?.password && errors?.password && (
          <div className="text-red-500 text-sm -mt-2">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          로그인
        </button>

        <div className="flex items-center my-2">
          <div className="w-full bg-gray-500 h-[2px]"></div>
          <p className="mx-4">OR</p>
          <div className="w-full w-full bg-gray-500 h-[2px]"></div>
        </div>

        <div className="flex border border-gray-300 p-3 rounded-lg text-lg cursor-pointer hover:border-gray-400 hover:shadow-xs transition-all duration-300 ease-in-out">
          <img src={GoogleIcon} alt="구글 로그인" className="w-6 self-center" />
          <p className="flex-1 text-center text-lg font-medium text-gray-800">
            구글 로그인
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
