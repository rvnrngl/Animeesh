import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiSolidSun } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ImageTitle from "../assets/animeesh-title.png";
import { Genre } from "./Genre";
import { FiChevronDown } from "react-icons/fi";

export const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // change to null
  const [isMenuClosed, setIsMenuClosed] = useState(true); // if dropdown menu is closed
  const [isGenreClosed, setIsGenreClosed] = useState(true); // if dropdown genre is closed
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

  // Add or remove 'overflow-hidden' class to the body element when the menu state changes
  useEffect(() => {
    if (!isMenuClosed) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuClosed]);

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

  //callback from child component
  const closeMenu = () => {
    setIsMenuClosed(true);
    setIsGenreClosed(true);
  };

  //toggle menu
  const toggleGenre = () => {
    setIsGenreClosed(!isGenreClosed);
  };

  // handle navigate to page
  const handleNavigate = (route) => {
    setIsMenuClosed(!isMenuClosed);
    navigate(route);
  };

  //handle search
  const handleSearch = () => {
    if (input.trim() !== "") {
      sessionStorage.setItem("inputValue", input);
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
      <div className="w-screen dark:bg-zinc-900 lg:px-5 relative z-[999]">
        <nav className="w-full border-b dark:border-none bg-white dark:bg-zinc-800 px-4 lg:px-7 z-50 shadow-md lg:rounded-b-[40px] py-2 md:py-3 lg:py-0">
          <ul className="text-lg flex justify-between items-center gap-2">
            <div className="flex w-full dark:text-gray-200 items-center gap-2 lg:gap-4">
              <button onClick={toggleMenu} className="lg:hidden">
                <GiHamburgerMenu className="text-[21px] xs:text-[25px] lg:text-2xl" />
              </button>
              <Link to="/">
                <div className="w-[110px] xs:w-[120px] lg:w-[170px] hover:animate-pulse">
                  <img
                    src={ImageTitle}
                    alt="Animeesh"
                    className="w-full drop-shadow-lg"
                  />
                </div>
              </Link>
              {/* Other pages link */}
              <div className="hidden lg:flex dark:text-gray-300 items-center font-semibold ml-2">
                <Link
                  to="/recent"
                  onClick={() =>
                    isGenreClosed ? "" : setIsGenreClosed(!isGenreClosed)
                  }
                  className="group/recent p-5 hover:animate-pulse hover:bg-zinc-100 dark:hover:bg-zinc-900 relative transition-all duration-100"
                >
                  <span className="absolute top-0 left-0 w-full h-[5px] bg-orange-500 hidden group-hover/recent:block"></span>
                  <span className="group-hover/recent:text-orange-400">
                    Recent
                  </span>
                </Link>
                <Link
                  to="/popular"
                  onClick={() =>
                    isGenreClosed ? "" : setIsGenreClosed(!isGenreClosed)
                  }
                  className="group/popular p-5 hover:animate-pulse hover:bg-zinc-100 dark:hover:bg-zinc-900 relative transition-all duration-100"
                >
                  <span className="absolute top-0 left-0 w-full h-[5px] bg-orange-500 hidden group-hover/popular:block"></span>
                  <span className="group-hover/popular:text-orange-400">
                    Popular
                  </span>
                </Link>
                <div
                  className={`group/genre hover:text-orange-400 cursor-pointer p-5 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative transition-all duration-100 ${
                    isGenreClosed
                      ? ""
                      : "text-orange-400 bg-zinc-100 dark:bg-zinc-900"
                  }`}
                >
                  <div
                    onClick={toggleGenre}
                    className="flex items-center justify-between gap-2"
                  >
                    <span
                      className={`absolute top-0 left-0 w-full h-[5px] bg-orange-500 group-hover/genre:block ${
                        isGenreClosed ? "hidden" : "block bg-orange-500"
                      }`}
                    ></span>
                    <span>Genres</span>
                    <FiChevronDown
                      size={20}
                      className={
                        isGenreClosed
                          ? "rotate-0 ease-in-out duration-300"
                          : "rotate-180 ease-in-out duration-300"
                      }
                    />
                  </div>
                  <div
                    className={`absolute left-2/4 transform -translate-x-1/2 w-[800px] h-[110px] p-2 px-6 bg-zinc-100 
                    dark:bg-zinc-800 z-[-1] ease-in-out duration-300 rounded-sm flex items-center gap-2 ${
                      isGenreClosed
                        ? "transform translate-y-[-25%] opacity-0 pointer-events-none"
                        : "transform translate-y-[25%] opacity-100 pointer-events-auto"
                    }`}
                  >
                    <Genre closeMenu={closeMenu} type={"laptop"} />
                  </div>
                </div>
              </div>
            </div>
            {/* search bar */}
            <div className="hidden lg:flex w-[380px] items-center gap-2 dark:text-gray-200 border border-gray-400 dark:border-none dark:bg-zinc-700/90 rounded-lg py-2 px-4 mr-2">
              <input
                id="searchpc"
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
            <Link to="search" className="lg:hidden mr-1 sm:mr-2">
              <ImSearch className="text-lg lg:text-xl dark:text-gray-300" />
            </Link>
            {/* button to toggle theme */}
            <div className="flex justify-center items-center pl-3 sm:pl-4 border-l border-zinc-500/50">
              <button
                onClick={toggleTheme}
                className="h-[25px] w-[25px] lg:h-[35px] lg:w-[35px] text-gray-900 bg-orange-400 xs:p-1 lg:p-4 relative overflow-hidden rounded-full shadow-sm"
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
              ? "fixed top-0 left-0 w-full h-full bg-zinc-950/60 z-[100] ease-in-out duration-300"
              : "bg-transparent"
          }
        ></div>
        <div
          className={
            !isMenuClosed
              ? "fixed w-[250px] h-screen top-0 left-0 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300 overflow-y-auto"
              : "fixed w-[250px] h-screen top-0 -left-[300px] bg-white dark:bg-zinc-800 dark:border-zinc-700 border-r py-6 z-[200] ease-in-out duration-300"
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
              className="border-b text-left border-zinc-600/50 py-3 px-6 font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/search")}
              className="border-b text-left border-zinc-600/50 py-3 px-6 font-semibold"
            >
              Search
            </button>
            <button
              onClick={() => handleNavigate("/recent")}
              className="border-b text-left border-zinc-600/50 py-3 px-6 font-semibold"
            >
              Recent
            </button>
            <button
              onClick={() => handleNavigate("/popular")}
              className="border-b text-left border-zinc-600/50 py-3 px-6 font-semibold"
            >
              Popular
            </button>
            <button
              onClick={toggleGenre}
              className="border-b text-left border-zinc-600/50 py-3 px-6 font-semibold flex 
              items-center justify-between"
            >
              <span>Genres</span>
              <FiChevronDown
                size={20}
                className={
                  isGenreClosed
                    ? "rotate-0 ease-in-out duration-300"
                    : "rotate-180 ease-in-out duration-300"
                }
              />
            </button>
            {/* dropdown genrelist */}
            <div className="w-full overflow-hidden">
              <div
                className={`w-full bg-zinc-200 dark:bg-zinc-900 py-3 px-6 flex flex-col items-center gap-3 ${
                  isGenreClosed
                    ? "transform translate-y-[-100%] opacity-0 transition-all duration-300 pointer-events-none"
                    : "transform translate-y-0 opacity-100 transition-all duration-300"
                }`}
              >
                <Genre closeMenu={closeMenu} type={"mobile"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
