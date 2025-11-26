import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "../assets/google-logo.png";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하이어야 합니다.",
      }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [level, setLevel] = useState<number>(0);
  const [showPassword, setShowPassword] = useState({
    password: false,
    passCheck: false,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const emailValue = watch("email"); // 폼 필드 값 실시간 관찰
  const passValue = watch("password");
  const passCheckValue = watch("passwordCheck");
  const nameValue = watch("name");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.log("회원가입 실패", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex text-2xl font-semibold p-3 my-3">
          <p className="cursor-pointer" onClick={() => navigate(-1)}>
            {"<"}
          </p>
          <p className="flex-1 text-center">회원가입</p>
        </div>

        {level === 0 && (
          <>
            <div
              onClick={handleGoogleLogin}
              className="flex border border-gray-300 p-3 rounded-lg text-lg cursor-pointer hover:border-gray-400 hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <img src={GoogleIcon} alt="구글 로그인" className="w-6 self-center" />
              <p className="flex-1 text-center text-lg font-medium text-gray-800">
                구글 로그인
              </p>
            </div>

            <div className="flex items-center my-2">
              <div className="w-full bg-gray-500 h-[2px]"></div>
              <p className="mx-4">OR</p>
              <div className="w-full w-full bg-gray-500 h-[2px]"></div>
            </div>

            <input
              {...register("email")}
              className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-md ${
                errors?.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              placeholder="이메일을 입력해주세요."
            />
            {errors.email && (
              <div className="text-red-500 text-sm -mt-2">{errors.email.message}</div>
            )}

            <button
              type="button"
              onClick={() => setLevel((prev) => prev + 1)}
              disabled={emailValue === "" || !!errors.email?.message}
              className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        )}

        {level === 1 && (
          <>
            <div className="flex items-center gap-2 text-lg">
              <MdOutlineEmail />
              {emailValue}
            </div>

            <div className="flex flex-col relative">
              <input
                {...register("password")}
                className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-md ${
                  errors?.password ? "border-red-500" : "border-gray-300"
                }`}
                type={showPassword.password ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
              ></input>
              {showPassword.password && (
                <MdOutlineRemoveRedEye
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
              {!showPassword.password && (
                <LuEyeClosed
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>

            {errors.password && (
              <div className="text-red-500 text-sm -mt-2">{errors.password.message}</div>
            )}

            <div className="flex flex-col relative">
              <input
                {...register("passwordCheck")}
                className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-md ${
                  errors?.passwordCheck ? "border-red-500" : "border-gray-300"
                }`}
                type={showPassword.passCheck ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요."
              />
              {showPassword.passCheck && (
                <MdOutlineRemoveRedEye
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      passCheck: !prev.passCheck,
                    }))
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
              {!showPassword.passCheck && (
                <LuEyeClosed
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      passCheck: !prev.passCheck,
                    }))
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
            {errors.passwordCheck && (
              <div className="text-red-500 text-sm -mt-2">
                {errors.passwordCheck.message}
              </div>
            )}

            <button
              type="button"
              onClick={() => setLevel((prev) => prev + 1)}
              disabled={
                !!errors.password?.message ||
                !!errors.passwordCheck?.message ||
                passValue === "" ||
                passCheckValue === ""
              }
              className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        )}

        {level === 2 && (
          <>
            <FaCircleUser className="w-full text-9xl text-gray-500 mb-3" />
            <input
              {...register("name")}
              className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-md ${
                errors?.name ? "border-red-500" : "border-gray-300"
              }`}
              type="name"
              placeholder="이름을 입력해주세요."
            />
            {errors.name && (
              <div className="text-red-500 text-sm -mt-2">{errors.name.message}</div>
            )}

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || nameValue === "" || !!errors.name?.message}
              className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
