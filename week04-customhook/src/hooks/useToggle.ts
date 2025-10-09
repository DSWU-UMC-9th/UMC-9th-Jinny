import { useState } from "react";

function useToggle(initialValue: boolean) {
  const [isOpen, setIsOpen] = useState(initialValue);

  // 토클 로직을 내부에 캡슐화
  const toggle = () => setIsOpen((prev) => !prev);

  return [isOpen, toggle] as const;
}

export default useToggle;
