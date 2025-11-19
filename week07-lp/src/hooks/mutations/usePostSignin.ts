import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";

function usePostSignin() {
  return useMutation({
    mutationFn: postSignin,
  });
}

export default usePostSignin;
