import { useState } from "react";

export default function useLoading(action) {
  const [loading, setLoading] = useState(false); 

  const doAction = async (...args) => {
    setLoading(true); 
    try {
      const result = await action(...args);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return [doAction, loading];
}
