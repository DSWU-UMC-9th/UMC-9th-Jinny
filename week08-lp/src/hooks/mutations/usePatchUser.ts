import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePatchUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUser,
    onMutate: async ({ name, bio, avatar }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const prevData = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      const newData = {
        ...prevData,
        data: {
          ...prevData?.data,
          name,
          bio,
          avatar,
        },
      };

      queryClient.setQueryData([QUERY_KEY.myInfo], newData);

      return { prevData, newData };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData([QUERY_KEY.myInfo], context?.prevData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchUser;
