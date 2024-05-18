import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="mb-10">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};
