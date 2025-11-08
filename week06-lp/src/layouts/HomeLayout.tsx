import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-[60px]">
        <Outlet />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
};

export default HomeLayout;
