import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLikes } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDetailDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLikes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLikes,

    onMutate: async (lpId) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lpId],
      });

      const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lps,
        lpId,
      ]);

      const newLpPost = { ...previousLpPost };

      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex((like) => like.id === userId) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      queryClient.setQueryData([QUERY_KEY.lps, lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (_error, newLp, context) => {
      queryClient.setQueryData([QUERY_KEY.lps, newLp], context?.previousLpPost);
    },

    onSettled: async (_data, _error, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variable],
      });
    },
  });
}

export default usePostLikes;
