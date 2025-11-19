import useDeleteComment from "../hooks/mutations/useDeleteComment";

interface DropDownProps {
  lpId: number;
  commentId: number;
  onEdit: () => void;
}

const DropDown = ({ lpId, commentId, onEdit }: DropDownProps) => {
  const MENU = [
    { id: 1, label: "수정하기" },
    { id: 2, label: "삭제하기" },
  ];

  // 댓글 삭제
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const handleDeleteComment = (lpId: number, commentId: number) => {
    deleteCommentMutate({ lpId, commentId });
  };

  return (
    <div className="w-[85px] bg-white border border-gray-300 flex flex-col divide-y divide-gray-300 rounded-sm cursor-pointer absolute right-0 z-5">
      {MENU.map((menu) => (
        <p
          onClick={() => {
            if (menu.id === 1) onEdit();
            if (menu.id === 2) handleDeleteComment(lpId, commentId);
          }}
          key={menu.id}
          className="text-center py-2 px-3 text-gray-600 hover:bg-gray-300 duration-300"
        >
          {menu.label}
        </p>
      ))}
    </div>
  );
};

export default DropDown;
