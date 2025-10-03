const Navbar = () => {
  const MenuItems = [
    { path: "/", label: "Home" },
    { path: "/first", label: "first" },
    { path: "/second", label: "second" },
    { path: "/third", label: "third" },
    { path: "/fourth", label: "fourth" },
  ];

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault(); // <a></a>의 기본 동작인 전체 리로드를 막음
    history.pushState({}, "", path); // 히스토리 스택에 새 항목 추가, pushState는 네트워크 요청을 발생시키지 않음
    window.dispatchEvent(new PopStateEvent("popstate")); // popstate 이벤트 수동으로 발생
  };

  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      {MenuItems.map((menu) => (
        <a key={menu.path} href={menu.path} onClick={(e) => handleNavigate(e, menu.path)}>
          {menu.label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
