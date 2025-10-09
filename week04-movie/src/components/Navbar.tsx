import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  {
    to: "/movies/popular",
    label: "인기 영화",
  },
  {
    to: "/movies/now_playing",
    label: "상영 중인 영화",
  },
  {
    to: "/movies/top_rated",
    label: "평점 높은 영화",
  },
  {
    to: "/movies/upcoming",
    label: "개봉 예정인 영화",
  },
];

const Navbar = () => {
  return (
    <nav className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) => {
            return isActive
              ? "text-teal-700 font-semibold"
              : "text-gray-700 hover:text-teal-700 transition-all duration-500 ease-in-out hover:font-semibold";
          }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
