"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { FAQItem } from "@/shared/constants/data";
import { faqItemId } from "@/shared/constants/anchors";
import {
  FAQ_HASH_SCROLL_DELAY_MS,
  notifyPageHashChange,
  PAGE_HASH_CHANGE,
  parseHashId,
  scrollToHash,
} from "@/shared/lib/scroll-to-hash";
import styles from "./faq-accordion.module.scss";

const FAQ_PANEL_OPEN_MS = FAQ_HASH_SCROLL_DELAY_MS;

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
  items: FAQItem[];
}

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const pathname = usePathname();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const scheduleScrollToFaq = () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = window.setTimeout(() => {
        scrollToHash(undefined, "smooth");
        scrollTimerRef.current = null;
      }, FAQ_PANEL_OPEN_MS);
    };

    const syncFromHash = () => {
      const slug = findSlugFromHash(items);
      if (!slug) return;

      setOpenSlug(slug);
      scheduleScrollToFaq();
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener(PAGE_HASH_CHANGE, syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener(PAGE_HASH_CHANGE, syncFromHash);
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, [items]);

  const clearFaqHash = () => {
    const id = parseHashId(window.location.hash);
    if (!id.startsWith("faq-")) return;

    const path = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", path);
  };

  const setFaqHash = (slug: string, options?: { notify?: boolean }) => {
    const path = `${pathname}${window.location.search}`;
    const nextId = faqItemId(slug);

    if (parseHashId(window.location.hash) === nextId) {
      if (options?.notify !== false) {
        notifyPageHashChange();
      }
      return;
    }

    history.replaceState(null, "", `${path}#${nextId}`);
    if (options?.notify !== false) {
      notifyPageHashChange();
    }
  };

  const toggleFAQ = (slug: string | undefined, index: number) => {
    const key = slug ?? String(index);

    if (openSlug === key) {
      setOpenSlug(null);
      if (slug) clearFaqHash();
      return;
    }

    setOpenSlug(key);
    if (slug) setFaqHash(slug, { notify: false });
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
            <h3 className={styles.faqHeading}>
              <button
                id={triggerId}
                type="button"
                className={styles.faqHeader}
                onClick={() => toggleFAQ(item.slug, index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className={styles.faqQuestion}>{item.question}</span>
                <ChevronIcon isOpen={isOpen} />
              </button>
            </h3>
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
