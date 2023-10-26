import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const url = import.meta.env.VITE_API;

export const UserProfile = () => {
  const userID = window.localStorage.getItem("userID");
  const userInfo = UseFetchUserInfo();
  const [form, setForm] = useState({
    newUsername: "",
    currentPassword: "",
    newPassword: "",
  });
  const [peekGroup, setPeekGroup] = useState({
    currentIsVisible: false,
    newIsVisible: false,
  });
  const navigate = useNavigate();

  /*-----------------------update username-----------------------*/
  const changeUsername = async () => {
    const { newUsername } = form;

    // check if username is not valid
    const isValid = /^[A-Za-z0-9].{4,}$/.test(form.newUsername);
    if (!isValid) {
      // clear username field
      setForm((prev) => ({
        ...prev,
        newUsername: "",
      }));
      alert(
        "Username should have 5 or more characters and does not begin with special characters!"
      );
      return;
    }

    // if username is valid
    try {
      const { data } = await axios.put(`${url}/user/update/username`, {
        userID,
        newUsername,
      });
      navigate(0);
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  /*-----------------------update password-----------------------*/
  const updatePassword = async () => {
    const { currentPassword, newPassword } = form;

    // check if paswords is not valid
    const isValid =
      /^[A-Za-z0-9].{4,}$/.test(form.currentPassword) &&
      /^[A-Za-z0-9].{4,}$/.test(form.newPassword);
    if (!isValid) {
      // clear password fields
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      alert(
        "Password should have 5 or more characters and does not begin with special characters!"
      );
      return;
    }

    // if passwords is valid
    try {
      const { data } = await axios.put(`${url}/user/update/password`, {
        userID,
        currentPassword,
        newPassword,
      });
      navigate(0);
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    alert("not yet implemented!");
  };

  const handleSubmit = async (type) => {
    if (type === "username") {
      await changeUsername();
    } else if (type === "password") {
      await updatePassword();
    } else if (type === "delete") {
      await deleteUser();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 justify-center bg-zinc-800 p-4 rounded-md shadow-sm text-zinc-300">
      <h1 className="font-semibold text-lg">Settings</h1>
      <div className="w-full text-sm flex items-end gap-3 justify-around md:px-5">
        <div className="w-full max-w-xs flex flex-col gap-4">
          <p>Update Username</p>
          <input
            type="text"
            value={form.newUsername}
            placeholder={userInfo.username}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                newUsername: event.target.value,
              }))
            }
            className="bg-transparent outline-none border py-2 px-4 border-zinc-600 focus:border-zinc-400 rounded-md placeholder:text-zinc-500 placeholder:font-[400]"
          />
        </div>
        <button
          onClick={() => handleSubmit("username")}
          className="text-zinc-800 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br hover:text-white/80 font-medium rounded-lg text-sm px-5 py-2 text-center"
        >
          Update
        </button>
      </div>
      <div className="w-full text-sm flex items-end gap-3 justify-around md:px-5">
        <div className="w-full max-w-xs flex flex-col gap-4">
          <p>Current password</p>
          <div className="w-full h-full flex items-center gap-1 border px-4 border-zinc-600 rounded-md overflow-hidden">
            <input
              type={peekGroup.currentIsVisible ? "text" : "password"}
              value={form.currentPassword}
              placeholder="Enter current password"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  currentPassword: event.target.value,
                }))
              }
              className="w-full bg-transparent outline-none py-2 placeholder:text-zinc-500 placeholder:font-[400]"
            />
            <button
              className="flex-shrink-0"
              onClick={() =>
                setPeekGroup((prev) => ({
                  ...prev,
                  currentIsVisible: !peekGroup.currentIsVisible,
                }))
              }
            >
              {peekGroup.currentIsVisible ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
          <p>New password</p>
          <div className="w-full h-full flex items-center gap-1 border px-4 border-zinc-600 rounded-md overflow-hidden">
            <input
              type={peekGroup.newIsVisible ? "text" : "password"}
              value={form.newPassword}
              placeholder="Enter current password"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  newPassword: event.target.value,
                }))
              }
              className="w-full bg-transparent outline-none py-2 placeholder:text-zinc-500 placeholder:font-[400]"
            />
            <button
              className="flex-shrink-0"
              onClick={() =>
                setPeekGroup((prev) => ({
                  ...prev,
                  newIsVisible: !peekGroup.newIsVisible,
                }))
              }
            >
              {peekGroup.newIsVisible ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={() => handleSubmit("password")}
          className="text-zinc-800 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br hover:text-white/80 font-medium rounded-lg text-sm px-5 py-2 text-center"
        >
          Update
        </button>
      </div>
      <button
        onClick={() => handleSubmit("delete")}
        className="text-zinc-800 my-5 hover:text-white/80 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Delete account
      </button>
    </div>
  );
};
