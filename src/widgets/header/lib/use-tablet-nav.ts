import { useEffect, useState } from "react";
import { BREAKPOINT_TABLET_PX } from "@/shared/constants/breakpoints";

export const useTabletNav = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BREAKPOINT_TABLET_PX}px)`);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsTablet(e.matches);

    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return isTablet;
};
