"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { FAQItem } from "@/shared/constants/data";
import { faqItemId } from "@/shared/constants/anchors";
import { parseHashId, scrollToHash } from "@/shared/lib/scroll-to-hash";
import styles from "./faq-accordion.module.scss";

/** Just over the 0.25s `grid-template-rows` transition in the module; a `#faq-*` jump re-scrolls after it, once items above have collapsed. */
const FAQ_PANEL_OPEN_MS = 280;

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
        scrollToHash();
        scrollTimerRef.current = null;
      }, FAQ_PANEL_OPEN_MS);
    };

    const syncFromHash = () => {
      const slug = findSlugFromHash(items);
      if (!slug) return;

      setOpenSlug(slug);
      scheduleScrollToFaq();
    };

    // Entry with `#faq-*` (direct or from another page): only open - nothing above the
    // item is open yet, so the jump already landed. In-page links fire `hashchange`.
    const openFrame = requestAnimationFrame(() => {
      const slug = findSlugFromHash(items);
      if (slug) setOpenSlug(slug);
    });
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      cancelAnimationFrame(openFrame);
      window.removeEventListener("hashchange", syncFromHash);
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

  // Accordion clicks keep the URL shareable but never scroll.
  const setFaqHash = (slug: string) => {
    const nextId = faqItemId(slug);
    if (parseHashId(window.location.hash) === nextId) return;

    history.replaceState(null, "", `${pathname}${window.location.search}#${nextId}`);
  };

  const toggleFAQ = (slug: string | undefined, index: number) => {
    const key = slug ?? String(index);

    if (openSlug === key) {
      setOpenSlug(null);
      if (slug) clearFaqHash();
      return;
    }

    setOpenSlug(key);
    if (slug) setFaqHash(slug);
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
