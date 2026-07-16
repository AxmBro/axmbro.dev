"use client";

import { useEffect, useState } from "react";
import { FAQ_ITEMS, type FAQItem } from "@/shared/constants/data";
import { faqItemId } from "@/shared/constants/anchors";
import { parseHashId } from "@/shared/lib/scroll-to-hash";
import styles from "./faq-accordion.module.scss";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={styles.chevron}
    data-open={isOpen ? "true" : "false"}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const findSlugFromHash = (items: FAQItem[]) => {
  const id = parseHashId(window.location.hash);
  if (!id.startsWith("faq-")) return null;
  const slug = id.slice("faq-".length);
  return items.some((item) => item.slug === slug) ? slug : null;
};

interface FAQAccordionProps {
  items?: FAQItem[];
}

export const FAQAccordion = ({ items = FAQ_ITEMS }: FAQAccordionProps) => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const slug = findSlugFromHash(items);
      if (slug) setOpenSlug(slug);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  const toggleFAQ = (slug: string | undefined, index: number) => {
    const key = slug ?? String(index);
    setOpenSlug(openSlug === key ? null : key);
  };

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const key = item.slug ?? String(index);
        const isOpen = openSlug === key;
        const triggerId = `faq-trigger-${key}`;
        const panelId = `faq-panel-${key}`;
        return (
          <div
            key={item.slug ?? index}
            id={item.slug ? faqItemId(item.slug) : undefined}
            className={styles.faqItem}
          >
            <button
              id={triggerId}
              type="button"
              className={styles.faqHeader}
              onClick={() => toggleFAQ(item.slug, index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <h3 className={styles.faqQuestion}>{item.question}</h3>
              <ChevronIcon isOpen={isOpen} />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.faqAnswerContainer}
              data-open={isOpen ? "true" : "false"}
              inert={!isOpen ? true : undefined}
            >
              <div className={styles.faqAnswerContent}>
                <div className={styles.faqAnswer}>{item.answer ?? item.answerText}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
