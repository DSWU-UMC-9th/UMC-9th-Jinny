import { Heart } from "lucide-react";
import type { LpDto } from "../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  data: LpDto;
}

const LpCard = ({ data }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${data.id}`)}
      className="relative cursor-pointer hover:scale-105 transition duration-500"
    >
      <img src={data.thumbnail} className="w-50 h-50 object-cover" />

      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/50 duration-500 flex justify-between items-end p-2 text-gray-100">
        <div>
          <p className="font-semibold">{data.title}</p>
          <p>{data.updatedAt.slice(0, 10)}</p>
        </div>

        <div className="flex gap-2 text-sm items-center">
          <Heart />
          {data.likes.length}
        </div>
      </div>
    </div>
  );
};

export default LpCard;
