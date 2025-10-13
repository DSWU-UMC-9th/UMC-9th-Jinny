import useForm from "../hooks/useForm";
import { validateSignIn, type UserSignInformation } from "../utils/validate";

const LoginPage = () => {
  const { values, errors, touched, getInputProps } = useForm<UserSignInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignIn,
  });

  const handleSubmit = () => {
    console.log(values);
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 ${
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
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 ${
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
      </div>
    </div>
  );
};

export default LoginPage;
