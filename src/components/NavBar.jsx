import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { PiTelevisionBold } from "react-icons/pi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiSolidSun } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // change to null
  const [isMenuClosed, setIsMenuClosed] = useState(true); // if dropdown menu is closed
  const [input, setInput] = useState(""); // store input field
  const navigate = useNavigate();

  // check preffered theme by the system
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      if (!localStorage.getItem("theme")) {
        setTheme("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#18181b";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#fff";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  //toogle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setIsDark((current) => !current);
  };

  //toggle menu
  const toggleMenu = () => {
    setIsMenuClosed(!isMenuClosed);
  };

  // handle navigate to page
  const handleNavigate = (route) => {
    setIsMenuClosed(!isMenuClosed);
    navigate(route);
  };

  //handle search
  const handleSearch = () => {
    if (input.trim() !== "") {
      localStorage.setItem("inputValue", input);
      if (window.location.hash === "#/search") {
        window.location.reload();
      } else {
        navigate("/search");
      }
    } else {
      console.log("Enter any keyword");
    }
  };

  //handle enter key  pressed
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="w-screen dark:bg-zinc-900 lg:px-5 relative">
        <nav className="w-full border-b dark:border-none dark:bg-zinc-800 px-5 lg:px-7 z-50 shadow-md lg:rounded-b-[40px] py-3 lg:py-0">
          <ul className="text-lg flex justify-between items-center gap-2">
            <div className="flex w-full dark:text-gray-200 items-center gap-2 lg:gap-4">
              <button onClick={toggleMenu} className="lg:hidden">
                <GiHamburgerMenu size={25} />
              </button>
              <Link to="/" className="flex items-center gap-2 lg:gap-3">
                <PiTelevisionBold className="text-orange-500 text-4xl" />
                <h1 className="font-semibold lg:text-2xl lg:font-bold hidden sm:block uppercase">
                  Animeesh
                </h1>
              </Link>
              {/* Other pages link */}
              <div className="hidden lg:flex dark:text-gray-300 items-center font-semibold ml-5">
                <Link
                  to="/recent"
                  className="p-5 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative group transition-all duration-100"
                >
                  <span className="absolute top-0 left-0 w-full h-[5px] bg-orange-500 hidden group-hover:block"></span>
                  <span className="group-hover:text-orange-400">Recent</span>
                </Link>
                <Link
                  to="/popular"
                  className="p-5 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative group transition-all duration-100"
                >
                  <span className="absolute top-0 left-0 w-full h-[5px] bg-orange-500 hidden group-hover:block"></span>
                  <span className="group-hover:text-orange-400">Popular</span>
                </Link>
                <Link
                  to="/genres"
                  className="p-5 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative group transition-all duration-100"
                >
                  <span className="absolute top-0 left-0 w-full h-[5px] bg-orange-500 hidden group-hover:block"></span>
                  <span className="group-hover:text-orange-400">Genre</span>
                </Link>
              </div>
            </div>
            {/* search bar */}
            <div className="hidden lg:flex w-[380px] items-center gap-2 dark:text-gray-200 border border-gray-400 dark:border-none dark:bg-zinc-700/90 rounded-lg py-2 px-4 mr-2">
              <input
                type="text"
                value={input}
                className="w-full text-sm lg:text-base bg-transparent outline-none"
                placeholder="Search anime..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnterKeyPress}
              />
              <button onClick={handleSearch}>
                <ImSearch className="text-base" />
              </button>
            </div>
            {/* appear in mobile */}
            <Link to="search" className="lg:hidden mr-2">
              <ImSearch className="text-xl dark:text-gray-300" />
            </Link>
            {/* button to toggle theme */}
            <div className="flex justify-center items-center pl-4 border-l border-zinc-500/50">
              <button
                onClick={toggleTheme}
                className="h-[30px] w-[30px] lg:h-[35px] lg:w-[35px] bg-orange-400 p-3 lg:p-4 relative overflow-hidden rounded-full shadow-sm"
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
            </div>
          </ul>
        </nav>
        {/* menu */}
        <div
          onClick={toggleMenu}
          className={
            !isMenuClosed
              ? "fixed top-0 left-0 w-full h-full bg-zinc-950/50 z-[100] ease-in-out duration-300"
              : "bg-transparent"
          }
        ></div>
        <div
          className={
            !isMenuClosed
              ? "fixed w-[250px] h-screen top-0 left-0 bg-white dark:bg-zinc-700 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300"
              : "fixed w-[250px] h-screen top-0 -left-[300px] bg-white dark:bg-zinc-700 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300"
          }
        >
          <div className="px-6 dark:text-gray-300">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 mb-5 bg-zinc-400/50 hover:bg-zinc-400 hover:text-gray-900 rounded-full py-1 px-4 ease-in-out duration-300"
            >
              <CgLogOut />
              <span className="font-semibold">Close</span>
            </button>
          </div>
          <div className="flex flex-col dark:text-gray-300">
            <button
              onClick={() => handleNavigate("/")}
              className="border-b text-left border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/search")}
              className="border-b text-left border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300 lg:hidden"
            >
              Search
            </button>
            <button
              onClick={() => handleNavigate("/recent")}
              className="border-b text-left border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Recent
            </button>
            <button
              onClick={() => handleNavigate("/popular")}
              className="border-b text-left border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Popular
            </button>
            <button
              onClick={() => handleNavigate("/genres")}
              className="border-b text-left border-zinc-500/50 py-3 px-6 font-semibold hover:text-gray-900 hover:bg-zinc-200 dark:hover:bg-zinc-400 transition-all duration-300"
            >
              Genres
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
