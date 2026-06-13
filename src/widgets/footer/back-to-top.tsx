"use client";

import { FaArrowUp } from "react-icons/fa6";
import styles from "./footer.module.scss";

export const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <button onClick={scrollToTop} className={styles.backToTop} aria-label="Back to top">
      <FaArrowUp size={14} aria-hidden />
      <span>Back to Top</span>
    </button>
  );
};
