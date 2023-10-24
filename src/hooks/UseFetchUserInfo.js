import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const UseFetchUserInfo = () => {
  const url = import.meta.env.VITE_API;
  const userID = window.localStorage.getItem("userID");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${url}/user/${userID}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (userID) {
      getUserInfo();
    }
  }, [url]);

  return userInfo;
};
