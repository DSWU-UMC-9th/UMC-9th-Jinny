import { THEME, useTheme } from "../context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from "clsx";

const Navbar = () => {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800 text-white"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;
