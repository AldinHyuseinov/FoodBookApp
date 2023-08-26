import { useState } from "react";

export default function useLoading(action) {
  const [loading, setLoading] = useState(false);

  const doAction = (...args) => {
    
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [doAction, loading];
}
