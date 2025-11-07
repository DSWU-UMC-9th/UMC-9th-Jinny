import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link to={"/create"}>
      <button className="absolute right-10 bottom-30 bg-gray-200 hover:bg-gray-300 duration-300 rounded-full shadow-xl text-gray-900 p-3 cursor-pointer">
        <Plus />
      </button>
    </Link>
  );
};

export default FloatingButton;
