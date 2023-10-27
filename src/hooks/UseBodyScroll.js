import { useEffect } from "react";

export const UseBodyScroll = (enabled) => {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [enabled]);

  return null;
};
