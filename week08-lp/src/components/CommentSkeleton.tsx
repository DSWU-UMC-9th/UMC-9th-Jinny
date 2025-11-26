const CommentSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="size-6 bg-gray-300 animate-pulse rounded-full"></div>
      <div className="flex flex-col w-[70%] gap-3 h-10">
        <div className="flex-1 rounded-xl bg-gray-300 animate-pulse w-1/3"></div>
        <div className="flex-1 rounded-xl bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
