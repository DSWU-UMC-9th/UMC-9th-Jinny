import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <>
      <input type="checkbox" id="toggle" className="hidden peer" onChange={toggleTheme} />
      <label
        htmlFor="toggle"
        className={clsx(
          "relative cursor-pointer w-[100px] h-[50px] rounded-[25px] after:w-[40px] after:h-[40px] after:rounded-full after:bg-white after:absolute after:left-[5px] after:top-[5px] after:transition-all after:duration-500 after:ease-in-out peer-checked:after:left-[55px] transition duration-500 ease-in-out peer-checked:after:bg-gray-900",
          {
            "bg-gray-500 text-white": !isLightMode,
            "bg-gray-200 text-black": isLightMode,
          }
        )}
      ></label>
    </>
  );
};

export default ThemeToggleButton;
