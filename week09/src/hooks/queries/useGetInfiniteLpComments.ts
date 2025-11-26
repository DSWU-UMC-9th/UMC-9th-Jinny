import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";

const useGetInfiniteLpComments = (
  lpId: number,
  { limit, order, search }: PaginationDto
) => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) =>
      getLpComments(lpId, { cursor: pageParam, limit, order, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
};

export default useGetInfiniteLpComments;
