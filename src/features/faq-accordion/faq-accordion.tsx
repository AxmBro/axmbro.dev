"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/shared/constants/data";
import styles from "./faq-accordion.module.scss";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      color: "var(--color-neutral-400)",
      flexShrink: 0,
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqList}>
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqHeader}
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.faqQuestion}>{item.question}</span>
              <ChevronIcon isOpen={isOpen} />
            </button>
            <div className={styles.faqAnswerContainer} data-open={isOpen ? "true" : "false"}>
              <div className={styles.faqAnswerContent}>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
