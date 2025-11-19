import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";

function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments"],
      });
    },
  });
}

export default useDeleteComment;
