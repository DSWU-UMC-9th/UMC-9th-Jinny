import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

const useGetLpList = ({ cursor, search, order, limit }: PaginationDto) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: () => getLpList({ cursor, search, order, limit }),

    // 컴포넌트가 마운트 되거나 처음에 포커스 들어오는 경우에도 재요청하지 않음
    // 5분 동안은 기존 데이터를 그대로 활용함
    staleTime: 5 * 60 * 1000, // 5분 -> 이 시간동안 데이터 그대로 사용

    // 사용되지 않는 (비활성 상태) 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime이 지나고 데이터가 신선하지 않더라도 일정 시간 동안 메모리에 보관함
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거됨
    gcTime: 10 * 60 * 1000, // 10분 -> 10분동안 사용되지 않으면 해당 캐시 데이터가 삭제되며 다시 요칭 시 새로운 데이터 받아옴

    // 조건에 따라 쿼리의 실행 여부를 제어
    // false로 주면 동작하지 않음
    // enabled: Boolean(search),

    // refetchInterval: 10 * 60 * 10, // 10초마다 refetch

    // retry: 3, // 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수
    // 기본값은 3회 정도, 네트워크 오류 등 일시적인 문제를 보완할 수 있음
    // queryClient 만들면서도 실행 가능

    // initialData: // 쿼리 실행 전 미리 제공할 초기 데이터 설정
    // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서 로딩 전에도 안전하게 ui를 구성할 수 있게 해줌

    // 파라미터가 변경될 때 이전 데이터를 유지하여 ui 깜빡임(Flicking)을 줄여줌
    // 페이지네이션 시 페이지 전호나 사이에 이전 데이터를 보여주어 사용자 경험 향상
    // keepPreviousData

    select: (data) => data.data.data,
  });
};

export default useGetLpList;
