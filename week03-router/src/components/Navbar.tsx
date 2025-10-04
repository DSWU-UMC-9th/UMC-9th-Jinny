import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        inset: "0",
        display: "flex",
        gap: "80px",
        padding: "20px",
      }}
    >
      <Link to={"/"}>홈</Link>
      <Link to={"/movies"}>영화</Link>
    </nav>
  );
};

export default Navbar;
