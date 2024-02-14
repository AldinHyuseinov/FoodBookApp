import { useEffect, useState } from "react";
import { getPublicInfo } from "../services/userService";

export default function usePublicInfo(isLoggedIn) {
  const [userPublicInfo, setUserPublicInfo] = useState({});

  useEffect(() => {
    const fetchUserPublicInfo = async () => {
      const fetchedUserPublicInfo = await getPublicInfo();
      setUserPublicInfo(fetchedUserPublicInfo);
    };
    isLoggedIn && fetchUserPublicInfo();
  }, []);

  return userPublicInfo;
}
