import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const ThemeContent = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx("p-4 h-dvh", isLightMode ? "bg-white" : "bg-gray-800 text-white")}
    >
      <h1 className="text-wxl font-bold">Thme Content</h1>
      <p className="mt-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, corporis!
        Voluptas soluta, sint provident assumenda aperiam officiis, sequi, natus voluptate
        architecto officia ratione expedita consequuntur? Fugiat quibusdam nulla dolorum
        quis.
      </p>
    </div>
  );
};

export default ThemeContent;
