import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log("rerendering...");

  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl text-gray-800">Throttle</h1>
      <p className="text-xl text-gray-400">ScrollY: {scrollY}px</p>
    </div>
  );
};

export default ThrottlePage;
