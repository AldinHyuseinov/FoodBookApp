import { useEffect, useState } from "react";
import { getUserPicture } from "../services/userService";

export default function usePicture(isLoggedIn) {
  const [userPicture, setUserPicture] = useState("");

  useEffect(() => {
    const fetchUserPicture = async () => {
      const fetchedUserPicture = await getUserPicture();
      setUserPicture(fetchedUserPicture);
    };
    isLoggedIn && fetchUserPicture();
  }, []);

  return userPicture.picture;
}
