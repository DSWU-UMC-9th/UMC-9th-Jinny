import { useMutation } from "@tanstack/react-query";
import { postSignout } from "../../apis/auth";

function usePostSignout() {
  return useMutation({
    mutationFn: postSignout,
  });
}

export default usePostSignout;
