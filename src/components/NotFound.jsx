import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  window.scrollTo({ top: 0 });
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen bg-zinc-950 flex-col items-center justify-center gap-7">
      <img
        src="https://media.tenor.com/YM3fW1y6f8MAAAAC/crying-cute.gif"
        alt="Gintoki"
        className="w-[220px] h-[150px] object-cover object-center border border-zinc-100 rounded-[2px]"
      />
      <h1 className="text-5xl font-bold text-gray-300">Oops!</h1>
      <p className="text-gray-400">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 hover:text-orange-400/80">
        <i onClick={() => navigate(-1)} className="cursor-pointer underline">
          Go Back
        </i>
      </p>
    </div>
  );
};
