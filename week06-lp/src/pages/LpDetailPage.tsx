import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, TrashIcon } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const LpDetailPage = () => {
  const { lpId } = useParams();

  const { data, isPending, isError } = useGetLpDetail(Number(lpId));

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="py-3 px-10 flex flex-col gap-2">
      <section className="flex gap-3 items-center">
        <img
          src={data?.author?.avatar}
          alt={`${data?.author} 이미지`}
          className="size-6 rounded-full"
        />
        <p className="font-semibold text-gray-600">{data?.author.name}</p>
      </section>

      <section className="flex justify-between">
        <p className="font-bold text-lg">{data?.title}</p>
        <div className="flex gap-3">
          <Pencil className="cursor-pointer text-gray-900 hover:text-gray-500" />
          <TrashIcon className="cursor-pointer text-gray-900 hover:text-gray-500" />
        </div>
      </section>

      <section className="flex justify-center my-10">
        <div className="size-100 overflow-hidden shadow-xl">
          <img src={data?.thumbnail} className="w-full h-full object-cover" />
        </div>
      </section>

      <div>{data?.content}</div>

      <section className="flex gap-2 mt-5">
        {data?.tags.map((tag) => (
          <div
            key={tag.id}
            className="border border-gray-300 shadow-md rounded-xl py-1 px-3 hover:border-gray-600 cursor-pointer duration-500"
          >
            # {tag.name}
          </div>
        ))}
      </section>

      <section className="flex gap-3 text-gray-500 justify-end mt-5">
        <Heart className="text-red-500 cursor-pointer" />
        {data?.likes.length}
      </section>
    </div>
  );
};

export default LpDetailPage;
