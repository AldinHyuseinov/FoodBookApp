import { useState } from "react";

export default function useButtonState() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleButtonState = (fields) => {
   
    if (fields.some((field) => field)) {
      setButtonDisabled(false);
      return;
    }
    setButtonDisabled(true);
  };

  return [buttonDisabled, handleButtonState];
}
