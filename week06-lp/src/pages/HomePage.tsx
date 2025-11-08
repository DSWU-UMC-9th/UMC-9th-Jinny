import { useEffect, useState } from "react";
import LpCard from "../components/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import LoadingSpinner from "../components/LoadingSpinner";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCardSkeletonList";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList({ limit: 10, order });

  // ref: 특정한 HTML 요소를 검사할 수 있음
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="p-3 w-full">
      <div className="flex w-full justify-end pr-7 my-2">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`rounded-l-sm px-3 py-2 w-20 cursor-pointer transition-all duration-300  hover:shadow-lg text-sm ${
            order === "asc"
              ? "bg-black text-white border border-black"
              : "bg-white border border-gray-300"
          }`}
        >
          오래된순
        </button>

        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`rounded-r-sm px-3 py-2 w-20 cursor-pointer shadow-sm trnasition-all duration-300  hover:shadow-lg text-sm ${
            order === "desc"
              ? "bg-black text-white border border-black"
              : "bg-white border border-gray-300"
          }`}
        >
          최신순
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {data.pages
          .map((page) => page.data.data)
          .flatMap((lps) => lps.map((lp) => <LpCard key={lp.id} data={lp} />))}

        {(isFetching || isFetchingNextPage || isPending) && (
          <LpCardSkeletonList count={20} />
        )}
      </div>

      <div ref={ref} className="mt-2 h-2"></div>
    </div>
  );
};

export default HomePage;
