import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/lp";

function usePatchComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments"],
      });
    },
  });
}

export default usePatchComment;
