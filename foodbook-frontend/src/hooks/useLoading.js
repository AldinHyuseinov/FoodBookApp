import { useState } from "react";

export default function useLoading(action) {
  const [loading, setLoading] = useState(true);

  const doAction = (...args) => action(...args).finally(() => setLoading(false));

  return [doAction, loading];
}
