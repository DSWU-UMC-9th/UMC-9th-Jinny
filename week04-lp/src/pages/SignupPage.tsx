import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

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
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하이어야 합니다.",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    console.log(rest);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex text-2xl font-semibold p-3 my-3">
          <p className="cursor-pointer">{"<"}</p>
          <p className="flex-1 text-center">회원가입</p>
        </div>

        <input
          {...register("name")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.name ? "border-red-500" : "border-gray-300"
          }`}
          type="name"
          placeholder="이름을 입력해주세요."
        />
        {errors.name && (
          <div className="text-red-500 text-sm -mt-2">{errors.name.message}</div>
        )}

        <input
          {...register("email")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.email ? "border-red-500" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        {errors.email && (
          <div className="text-red-500 text-sm -mt-2">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.password ? "border-red-500" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && (
          <div className="text-red-500 text-sm -mt-2">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-gray-300 outline-none w-[400px] p-3 focus:border-gray-500 rounded-lg transition-all duration-500 hover:border-gray-400 hover:shadow-xs ${
            errors?.passwordCheck ? "border-red-500" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm -mt-2">{errors.passwordCheck.message}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
