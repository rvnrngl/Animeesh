import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { PiTelevisionBold } from "react-icons/pi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiSolidSun } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";

export const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState("light"); // change to null
  const [isMenuClosed, setIsMenuClosed] = useState(true); // if dropdown menu is closed

  // check preffered theme by the system
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //toogle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark((current) => !current);
  };

  //toggle menu
  const toggleMenu = () => {
    setIsMenuClosed(!isMenuClosed);
  };

  return (
    <>
      <nav className="w-screen h-[75px] border-b dark:border-none fixed top-0 left-0 bg-white/70 dark:bg-zinc-900/80 px-5 z-50 shadow-md">
        <ul className="text-xl flex justify-between items-center gap-2 py-5">
          <div className="flex w-full dark:text-gray-300 items-center gap-2 lg:gap-4">
            <button onClick={toggleMenu}>
              <GiHamburgerMenu size={25} />
            </button>
            <Link to="/" className=" flex items-center gap-2">
              <PiTelevisionBold size={40} className="text-orange-500" />
              <h1 className="font-semibold lg:font-bold hidden sm:block">
                Animeesh
              </h1>
            </Link>
            {/* search bar */}
            <div className="hidden lg:flex w-[380px] items-center gap-2 border border-gray-500 dark:border-none dark:bg-zinc-500/50 rounded-full py-2 px-5">
              <input
                type="text"
                className="w-full text-sm lg:text-lg bg-transparent outline-none"
                placeholder="Search anime..."
              />
              <Link to="search">
                <ImSearch />
              </Link>
            </div>
          </div>
          {/* login button */}
          <button className="py-1 px-4 text-lg font-light rounded-sm shadow-sm bg-orange-400">
            Login
          </button>
          {/* button to toggle theme */}
          <button
            onClick={toggleTheme}
            className="h-[35px] w-[35px] bg-orange-400 p-4 relative overflow-hidden rounded-full shadow-sm"
          >
            <BiSolidSun
              size={20}
              className={
                isDark === true
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  : "absolute -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              }
            />
            <BsFillMoonStarsFill
              size={15}
              className={
                isDark === false
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  : "absolute top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              }
            />
          </button>
        </ul>
      </nav>
      {/* menu */}
      <div
        onClick={toggleMenu}
        className={
          !isMenuClosed
            ? "w-screen h-screen bg-zinc-700/30 fixed top-0 left-0 z-[100] ease-in-out duration-300"
            : "fixed -left[100vh]"
        }
      >
        <div
          className={
            !isMenuClosed
              ? "fixed w-[300px] lg:w-[250px] h-screen top-0 left-0 bg-white dark:bg-zinc-700 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300"
              : "fixed w-[300px] lg:w-[250px] h-screen top-0 -left-[350px] bg-white dark:bg-zinc-700 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300"
          }
        >
          <div className="px-6 dark:text-gray-300">
            <button
              onClick={() => toggleMenu(false)}
              className="flex items-center gap-2 mb-5 bg-zinc-400/50 hover:bg-zinc-400 hover:text-gray-900 rounded-full py-1 px-4 ease-in-out duration-300"
            >
              <CgLogOut />
              <span className="font-semibold">Close</span>
            </button>
          </div>
          <div className="flex flex-col dark:text-gray-300">
            <Link
              to="/"
              className="border-b border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="border-b border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300 lg:hidden"
            >
              Search
            </Link>
            <Link
              to="/popular"
              className="border-b border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Popular
            </Link>
            <Link
              to="/genres"
              className="border-b border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Genres
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
