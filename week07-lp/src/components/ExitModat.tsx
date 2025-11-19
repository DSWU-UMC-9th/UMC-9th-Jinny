import { X } from "lucide-react";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { useNavigate } from "react-router-dom";

interface ExitModalProps {
  setShowModal: () => void;
}

const ExitModal = ({ setShowModal }: ExitModalProps) => {
  const { mutate } = useDeleteUser();
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-80 bg-white p-10 rounded-sm flex flex-col items-center justify-center gap-12">
        <X
          onClick={setShowModal}
          className="absolute top-10 right-10 cursor-pointer hover:bg-gray-300 hover:rounded-full"
        />
        <p className="font-bold text-xl">정말 탈퇴하시겠습니까?</p>

        <div className="flex w-full gap-5 justify-center">
          <button
            onClick={() => {
              mutate();
              navigate("/login");
            }}
            className="w-1/3 rounded-sm border bg-white text-gray-900 px-4 py-2 cursor-pointer hover:shadow-md duration-300"
          >
            예
          </button>
          <button
            onClick={setShowModal}
            className="w-1/3 rounded-sm border border-gray-900 bg-gray-900 px-4 text-white cursor-pointer hover:shadow-md duration-300"
          >
            아니오
          </button>
        </div>
      </div>

      <div className="fixed inset-0 bg-black/50 z-10"></div>
    </div>
  );
};

export default ExitModal;
