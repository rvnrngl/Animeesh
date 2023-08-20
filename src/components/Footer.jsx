import React from "react";
import FooterBg from "../assets/footer-bg.png";
import ImageTitle from "../assets/animeesh-title-reflection.png";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  // gintama anime hehe
  const anime = {
    id: 918,
  };

  const handleNavigate = () => {
    if (window.location.hash === "#/watch") {
      navigate(window.location.reload(), { state: { anime } });
      window.scrollTo({ top: 0 });
    } else {
      navigate("/watch", {
        state: { anime },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-screen h-[150px] md:h-[200px] dark:bg-zinc-800/30 md:px-5 border-t mt-10">
      <div
        className="w-full h-full flex flex-col items-center md:items-start justify-center 
      gap-2 relative"
      >
        <div className="w-[110px] xs:w-[120px] md:w-[140px] lg:w-[170px] hover:animate-pulse">
          <img
            src={ImageTitle}
            alt="Animeesh"
            className="w-full drop-shadow-lg"
          />
        </div>
        <div className="text-center md:text-left text-xs md:text-sm text-gray-700 dark:text-gray-400">
          <p className="mb-1 text-gray-800 dark:text-gray-300">
            Copyright © 2023 Animeesh. All Rights Reserved
          </p>
          <p className="[text-wrap:balance]">
            Disclaimer: Animeesh does not store any files on its server.
            <br className="hidden md:block" /> All contents are provided by
            non-affiliated third parties.
          </p>
        </div>
        <button
          onClick={handleNavigate}
          className="hidden md:block absolute right-0 h-full"
        >
          <img
            src={FooterBg}
            alt="bg"
            className="h-full opacity-50 mix-blend-luminosity hover:mix-blend-normal hover:opacity-75 ease-in-out duration-200"
          />
        </button>
      </div>
    </div>
  );
};
