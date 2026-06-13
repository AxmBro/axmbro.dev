"use client";

import { useEffect, useState } from "react";
import { FAQ_ITEMS } from "@/shared/constants/data";
import { faqItemId } from "@/shared/constants/anchors";
import { parseHashId } from "@/shared/lib/scroll-to-hash";
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
    aria-hidden
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

const findSlugFromHash = () => {
  const id = parseHashId(window.location.hash);
  if (!id.startsWith("faq-")) return null;
  const slug = id.slice("faq-".length);
  return FAQ_ITEMS.some((item) => item.slug === slug) ? slug : null;
};

export const FAQAccordion = () => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const slug = findSlugFromHash();
      if (slug) setOpenSlug(slug);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const toggleFAQ = (slug: string | undefined, index: number) => {
    const key = slug ?? String(index);
    setOpenSlug(openSlug === key ? null : key);
  };

  return (
    <div className={styles.faqList}>
      {FAQ_ITEMS.map((item, index) => {
        const key = item.slug ?? String(index);
        const isOpen = openSlug === key;
        return (
          <div
            key={item.slug ?? index}
            id={item.slug ? faqItemId(item.slug) : undefined}
            className={styles.faqItem}
          >
            <button
              className={styles.faqHeader}
              onClick={() => toggleFAQ(item.slug, index)}
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
