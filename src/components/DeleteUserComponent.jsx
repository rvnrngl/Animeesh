import { UseBodyScroll } from "@/hooks/UseBodyScroll";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API;

export const DeleteUserComponent = ({
  username,
  userID,
  setIsDeleteWindowOpen,
}) => {
  const [input, setInput] = useState("");
  const [_, setCookie, removeCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();

  // disable scrolling when this component render
  UseBodyScroll(false);

  const deleteUser = async () => {
    if (username !== input) {
      alert("Enter correct username!");
      return;
    }

    try {
      const { data } = await axios.delete(`${url}/user/${userID}`);
      removeCookie("access-token", { path: "/" });
      window.localStorage.removeItem("userID");
      window.localStorage.removeItem("userName");
      alert(data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-zinc-950/80 overflow-hidden z-[9999]">
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-xs p-4 gap-4 bg-zinc-800 flex items-center justify-center flex-col rounded-md">
          <h1 className="text-center">
            Enter "<span className="text-orange-400">{username}</span>" to
            delete your account.
          </h1>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-zinc-700 focus:border-zinc-600 rounded-md px-4 py-2 bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
          <div className="w-full flex flex-col">
            <button
              onClick={deleteUser}
              className="text-zinc-800 hover:text-white/80 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteWindowOpen(false)}
              className="text-zinc-800 hover:text-white/80 bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
