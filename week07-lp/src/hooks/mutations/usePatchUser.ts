import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

function usePatchUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchUser;
