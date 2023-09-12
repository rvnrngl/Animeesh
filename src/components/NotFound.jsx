import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  window.scrollTo({ top: 0 });
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 hover:text-orange-400/80">
        <i onClick={() => navigate(-1)} className="cursor-pointer underline">
          Go Back
        </i>
      </p>
    </div>
  );
};
