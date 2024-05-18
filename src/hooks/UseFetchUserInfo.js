import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { userService } from "@/services/userService";

export const UseFetchUserInfo = () => {
  const userID = window.localStorage.getItem("userID");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await userService.get(`/user/${userID}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (userID) {
      getUserInfo();
    }
  }, [userID]);

  return userInfo;
};
