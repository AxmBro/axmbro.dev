"use client";

import { FaArrowUp } from "react-icons/fa6";
import { FOOTER_TEXTS } from "@/shared/constants/data";
import { getScrollBehavior } from "@/shared/lib/motion";
import styles from "./footer.module.scss";

export const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <button type="button" onClick={scrollToTop} className={styles.backToTop} aria-label={FOOTER_TEXTS.backToTopAria}>
      <FaArrowUp size={14} aria-hidden />
      <span>{FOOTER_TEXTS.backToTop}</span>
    </button>
  );
};
