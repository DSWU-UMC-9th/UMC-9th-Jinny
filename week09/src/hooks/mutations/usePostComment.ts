import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/lp";

function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments"],
      });
    },
  });
}

export default usePostComment;
