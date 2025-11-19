import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, TrashIcon, EllipsisVertical } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import CommentSkeleton from "../components/CommentSkeleton";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLikes from "../hooks/mutations/usePostLikes";
import useDeleteLikes from "../hooks/mutations/useDeleteLikes";
import usePostComment from "../hooks/mutations/usePostComment";
import DropDown from "../components/DropDown";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const [input, setInput] = useState("");
  const [showDropDownId, setShowDropDownId] = useState<number | null>(null);

  const { data, isPending, isError } = useGetLpDetail(Number(lpId));
  const { data: myData } = useGetMyInfo(accessToken);

  const {
    data: commentsData,
    isFetching: isFetchingComments,
    isFetchingNextPage: isFetchingNextCommentsPage,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteLpComments(Number(lpId), {
    limit: 5,
    order: order,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // mutate -> 비동기 요청을 실행하고 콜백 함수를 이용해서 후속 작업을 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLikes();
  const { mutate: dislikeMutate } = useDeleteLikes();

  const { mutate: postCommentMutate } = usePostComment();

  // const isLiked = data?.likes
  //   .map((like) => like.userId)
  //   .includes(myData?.data.id as number);
  const isLiked = data?.likes.some((like) => like.userId === myData?.data.id);

  const flatCommentsData = commentsData?.pages
    .map((page) => page.data)
    .flatMap((comment) => comment.data)
    .map((comment) => ({
      ...comment,
      isMine: comment.authorId === myData?.data.id,
    }));

  const handleLikeLp = () => {
    likeMutate(Number(lpId));
  };

  const handleDislikeLp = () => {
    dislikeMutate(Number(lpId));
  };

  const handleSubmitComment = (lpId: number, input: string) => {
    postCommentMutate({ lpId, body: { content: input } });
    setInput("");
  };

  const handleSubmitCommentEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    lpId: number,
    input: string
  ) => {
    if (e.key === "Enter") handleSubmitComment(lpId, input);
  };

  useEffect(() => {
    if (inView && !isFetchingComments && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingComments, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-3 px-10 flex flex-col gap-2 max-w-[1024px]">
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
          <Heart
            onClick={isLiked ? handleDislikeLp : handleLikeLp}
            className="text-red-500 cursor-pointer"
            fill={isLiked ? "red" : "white"}
          />

          {data?.likes.length}
        </section>
      </div>

      <div className="px-10 w-full flex flex-col gap-5 mt-10 max-w-[1024px]">
        <section className="flex items-center justify-between">
          <p className="font-bold text-lg">댓글</p>

          <div>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`rounded-l-sm px-3 py-2 w-20 cursor-pointer transition-all duration-300  hover:shadow-lg text-xs ${
                order === "asc"
                  ? "bg-black text-white border border-black"
                  : "bg-white border border-gray-300"
              }`}
            >
              오래된순
            </button>

            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`rounded-r-sm px-3 py-2 w-20 cursor-pointer shadow-sm trnasition-all duration-300  hover:shadow-lg text-xs ${
                order === "desc"
                  ? "bg-black text-white border border-black"
                  : "bg-white border border-gray-300"
              }`}
            >
              최신순
            </button>
          </div>
        </section>

        <div className="flex gap-5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleSubmitCommentEnter(e, Number(lpId), input)}
            placeholder="댓글을 입력해주세요"
            className="flex-1 border border-gray-300 shadow-sm rounded-xl py-2 px-3 hover:border-gray-400 hover:shadow-md duration-500 outline-none cursor-pointer"
          />

          <button
            onClick={() => handleSubmitComment(Number(lpId), input)}
            className="rounded-xl border bg-gray-900 px-4 text-white cursor-pointer"
          >
            작성
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {flatCommentsData?.map((comment) => (
            <div className="flex justify-between">
              <div className="flex gap-3 items-start">
                <img
                  src={comment.author.avatar}
                  alt={`${comment.author}의 이미지`}
                  className="size-6 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-600">{comment.author.name}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
              {comment.isMine && (
                <div className="relative">
                  <EllipsisVertical
                    onClick={() =>
                      setShowDropDownId((prev) =>
                        prev === comment.id ? null : comment.id
                      )
                    }
                    className="cursor-pointer hover:text-gray-500"
                  />
                  {showDropDownId === comment.id && (
                    <DropDown lpId={Number(lpId)} commentId={comment.id} />
                  )}
                </div>
              )}
            </div>
          ))}

          {(isFetchingComments || isFetchingNextCommentsPage) && <CommentSkeleton />}
        </div>

        <div ref={ref} className="h-2 "></div>
      </div>
    </div>
  );
};

export default LpDetailPage;
