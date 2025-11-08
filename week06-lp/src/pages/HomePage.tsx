import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="mt-20 w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border"
      />

      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((lp) => (
          <LpCard data={lp} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
