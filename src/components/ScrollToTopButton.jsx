import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-orange-400 dark:bg-gray-800 border-1 border-gray-900 dark:border-none p-5 rounded-full group cursor-pointer z-[999] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-orange-400 text-xl" />
    </div>
  );
};
