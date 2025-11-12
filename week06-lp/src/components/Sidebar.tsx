import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const MENU = [
    {
      id: 1,
      label: "Search",
      to: "/search",
    },
    {
      id: 2,
      label: "Mypage",
      to: "/mypage",
    },
  ];

  return (
    <>
      <div
        className={`flex flex-col gap-4 bg-white px-4 pt-5 h-dvh w-[250px] absolute left-0 top-0 z-2 transform transition-transform duration-400 ease-in-out shadow-lg ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full justify-end mb-5">
          <X
            onClick={() => setShowSidebar((prev) => !prev)}
            className="cursor-pointer hover:bg-gray-300 hover:rounded-full"
          />
        </div>

        {MENU.map((m) => (
          <Link
            to={m.to}
            key={m.id}
            className="flex justify-between items-center gap-2 cursor-pointer text-gray-900 hover:text-gray-500 font-semibold text-lg duration-300"
          >
            {m.label}
            <ChevronRight />
          </Link>
        ))}
      </div>

      {showSidebar && (
        <div
          onClick={() => setShowSidebar((prev) => !prev)}
          className="fixed inset-0 bg-black/30 z-1"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
