import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <nav>navbar</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default ProtectedLayout;
