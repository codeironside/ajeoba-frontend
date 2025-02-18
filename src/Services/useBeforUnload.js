import { useEffect, useRef } from "react";

export const useBerforUnload = (fn) => {
  const callbackFunction = useRef(fn);

  useEffect(() => {
    const onUnload = callbackFunction.current;
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [callbackFunction]);
};
