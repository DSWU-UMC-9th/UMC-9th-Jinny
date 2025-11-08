import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  const { data, isPending, isError } = useGetLpList({ order });

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
        {data?.map((lp) => (
          <LpCard data={lp} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
