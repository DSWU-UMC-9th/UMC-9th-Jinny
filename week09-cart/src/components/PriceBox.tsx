import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";
import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-12 flex justify-between items-center">
      <button
        onClick={handleInitializeCart}
        className="border p-2 rounded-md cursor-pointer bg-gray-800 text-white "
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>

      {isOpen && <Modal />}
    </div>
  );
};

export default PriceBox;
