import { useEffect, useState } from "react";
import { getPublicInfo, getPersonalInfo } from "../services/userService";

export default function useInfo(type, isLoggedIn) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const fetchedUserInfo = await (type === "public" ? getPublicInfo() : getPersonalInfo());
      setUserInfo(fetchedUserInfo);
    };
    isLoggedIn && fetchUserInfo();
  }, []);

  return userInfo;
}
