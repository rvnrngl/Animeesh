import React from "react";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { NavBarMenuButton } from "./NavBarMenuButton";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const NavBarMenu = ({ isOpen, setIsOpen }) => {
  const [_, setCookie, removeCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/user/profile");
    setIsOpen(false);
  };

  const navigateToWatchList = () => {
    navigate("/user/watch-list");
    setIsOpen(false);
  };

  const handleLogOut = () => {
    removeCookie("access-token", { path: "/" });
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userName");
    navigate(0);
  };

  return (
    <div
      className={`absolute top-0 right-0 transform translate-y-[40px] lg:translate-y-[69px] py-2 border transition-all duration-300 ease-in-out border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg rounded-md ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div
          className={`w-full h-full grid grid-cols-1 text-sm transition-all duration-300 ease-in-out text-gray-900 dark:text-gray-200 ${
            isOpen ? "translate-y-0" : "-translate-y-[100%]"
          }`}
        >
          {isOpen ? (
            <>
              <NavBarMenuButton onClick={navigateToProfile} title="Profile">
                <BiSolidUser size={20} />
              </NavBarMenuButton>
              <NavBarMenuButton onClick={navigateToWatchList} title="Watchlist">
                <BsFillBookmarkFill size={15} />
              </NavBarMenuButton>
              <NavBarMenuButton onClick={handleLogOut} title="Logout">
                <BiLogOut size={20} />
              </NavBarMenuButton>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
