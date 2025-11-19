import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikes } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLikes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default useDeleteLikes;
