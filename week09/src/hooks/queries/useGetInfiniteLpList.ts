import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

const useGetInfiniteLpList = ({ limit, search, order }: PaginationDto) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam }) => getLpList({ cursor: pageParam, limit, search, order }), // tanstack query에서 제공되는 pageParam 사용
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // console.log(lastPage, allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined; // 데이터가 있으면 다음 커서 값 넘김
    },
  });
};

export default useGetInfiniteLpList;
