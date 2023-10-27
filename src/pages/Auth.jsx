import React from "react";
import ImageTitle from "../assets/animeesh-title.png";
import { useState } from "react";
import { BiLock, BiSolidUserCircle } from "react-icons/bi";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const url = import.meta.env.VITE_API;

export const Auth = () => {
  const [auth, setAuth] = useState("login");

  const changeAuthType = (type) => {
    setAuth(type);
  };

  return (
    <div className="w-screen h-screen text-gray-100 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black">
      <div className="w-full h-full px-4 flex gap-8 justify-center items-center">
        {/* Auth Container */}
        <div className="w-full max-w-md bg-zinc-800 px-4 flex flex-col justify-center items-center rounded-lg">
          {/* title */}
          <div className="w-[35%] py-4 pt-6">
            <img src={ImageTitle} alt="Animeesh" className="w-full h-full" />
          </div>
          {/* Login/Register */}
          <div className="w-full flex justify-between text-base md:text-lg lg:text-xl rounded-sm overflow-hidden">
            <div
              onClick={() => changeAuthType("login")}
              className={`w-2/4 flex items-center justify-center py-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-sm ${
                auth === "login"
                  ? "bg-orange-400 text-gray-900"
                  : "bg-zinc-700/50 text-gray-100"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => changeAuthType("register")}
              className={`w-2/4 flex items-center justify-center py-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-sm ${
                auth === "register"
                  ? "bg-orange-400 text-gray-900"
                  : "bg-zinc-700/50 text-gray-100"
              }`}
            >
              Register
            </div>
          </div>
          {auth === "login" ? (
            <Login />
          ) : (
            <Register changeAuthType={changeAuthType} />
          )}
          {auth === "login" ? (
            <div className="flex w-full items-center justify-center gap-1 text-sm pb-4">
              <span className="text-gray-500">Create an account?</span>
              <button
                onClick={() => changeAuthType("register")}
                className="text-orange-400"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center gap-1 text-sm pb-4">
              <span className="text-gray-500">Already have an account?</span>
              <button
                onClick={() => changeAuthType("login")}
                className="text-orange-400"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [_, setCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);
    // check if username or password is empty
    if (username === "" || password === "") {
      alert("Input fields required!");
      setButtonDisabled(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      if (response.data.isSuccess) {
        setCookie("access-token", response.data.token, { path: "/" });
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("userName", response.data.username);
        alert(response.data.message);
        navigate(-1);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setButtonDisabled(false);
      console.error(error);
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="w-full flex flex-col gap-4 text-base">
        <h1 className="w-full text-center text-gray-400 text-lg lg:text-xl font-semibold">
          Welcome back!
        </h1>
        <div className="border border-zinc-700 rounded-sm flex items-center gap-2 p-2">
          <BiSolidUserCircle className="flex-shrink-0 text-zinc-500 text-xl lg:text-2xl" />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
        </div>
        <div className="border border-zinc-700 rounded-sm flex items-center gap-2 p-2 mb-2">
          <BiLock className="flex-shrink-0 text-zinc-500 text-xl lg:text-2xl" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="pass"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
          <button
            className="flex-shrink-0 text-xl text-zinc-500 hover:text-zinc-200"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={buttonDisabled}
          className="bg-orange-400 text-gray-900 p-2 px-4 font-semibold rounded-sm shadow-sm 
          disabled:bg-zinc-600 disabled:cursor-wait"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export const Register = ({ changeAuthType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [peekGroup, setPeekGroup] = useState({
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    // check if either inputs is empty
    if (username === "" || password === "" || confirmPassword === "") {
      alert("Input fields required!");
      setButtonDisabled(false);
      return;
    }

    // check if password and confirmpassword is the same
    if (password !== confirmPassword) {
      alert("Password and Confirm Password should be the same!");
      setButtonDisabled(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/auth/register`, {
        username,
        password,
      });
      if (response.data.isSuccess) {
        alert(response.data.message);
        changeAuthType("login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setButtonDisabled(false);
      console.error(error);
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="w-full flex flex-col gap-4 text-base">
        <h1 className="w-full text-center text-gray-400 text-lg lg:text-xl font-semibold">
          Create an account.
        </h1>
        <div className="border border-zinc-700 rounded-sm flex items-center gap-2 p-2">
          <BiSolidUserCircle className="text-zinc-500 text-xl lg:text-2xl" />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
        </div>
        <div className="border border-zinc-700 rounded-sm flex items-center gap-2 p-2">
          <BiLock className="text-zinc-500 text-xl lg:text-2xl" />
          <input
            type={peekGroup.isPasswordVisible ? "text" : "password"}
            id="pass"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
          <button
            className="flex-shrink-0 text-xl text-zinc-500 hover:text-zinc-200"
            onClick={() =>
              setPeekGroup((prev) => ({
                ...prev,
                isPasswordVisible: !peekGroup.isPasswordVisible,
              }))
            }
          >
            {peekGroup.isPasswordVisible ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
        <div className="border border-zinc-700 rounded-sm flex items-center gap-2 p-2 mb-2">
          <BiLock className="text-zinc-500 text-xl lg:text-2xl" />
          <input
            type={peekGroup.isConfirmPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 placeholder:font-[400]"
          />
          <button
            className="flex-shrink-0 text-xl text-zinc-500 hover:text-zinc-200"
            onClick={() =>
              setPeekGroup((prev) => ({
                ...prev,
                isConfirmPasswordVisible: !peekGroup.isConfirmPasswordVisible,
              }))
            }
          >
            {peekGroup.isConfirmPasswordVisible ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={buttonDisabled}
          className="bg-orange-400 text-gray-900 p-2 px-4 font-semibold rounded-sm shadow-sm 
          disabled:bg-zinc-600 disabled:cursor-wait"
        >
          Register
        </button>
      </div>
    </div>
  );
};
