"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PROJECT_PAGE_TEXTS } from "@/shared/constants/data";
import { resolveCssLengthPx } from "@/shared/lib/sticky-scroll-offset";
import { HashLink } from "@/shared/ui/hash-link";
import type { ProjectTocItem } from "./types";
import { useSectionItemPosition } from "./lib/use-section-item-position";
import styles from "./project-toc.module.scss";

interface ProjectTocProps {
  items: ProjectTocItem[];
}

const MIN_ITEMS = 3;
const SCROLL_STEP_MIN = 160;
const SCROLL_STEP_MAX = 520;
const SETTLE_MS = 120;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function isPageAtBottom() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 && window.scrollY >= maxScroll - 2;
}

function scrollControlPadPx(root: HTMLElement): number {
  const btn = root.parentElement?.querySelector<HTMLElement>(
    `button.${styles.scrollBtn}`,
  );
  return btn?.offsetWidth ?? 0;
}

function scrollChildIntoViewX(root: HTMLElement, child: HTMLElement) {
  const rootRect = root.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();
  const pad = scrollControlPadPx(root);
  const clipped =
    childRect.left < rootRect.left + pad ||
    childRect.right > rootRect.right - pad;
  if (!clipped) return;

  const childCenter = childRect.left + childRect.width / 2;
  const rootCenter = rootRect.left + rootRect.width / 2;
  const max = Math.max(0, root.scrollWidth - root.clientWidth);
  root.scrollTo({
    left: clamp(root.scrollLeft + (childCenter - rootCenter), 0, max),
    behavior: "smooth",
  });
}

// One tab plus its "6/24" position counter. Own component so the scroll spy
// hook stays per item instead of running in the parent's map.
function TocLink({
  item,
  isActive,
  onSelect,
}: {
  item: ProjectTocItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const itemCount = item.itemCount ?? 0;
  const position = useSectionItemPosition(isActive ? item.id : null, itemCount);

  return (
    <HashLink
      href={`#${item.id}`}
      className={`${styles.link}${isActive ? ` ${styles.linkActive}` : ""}`}
      onClick={() => onSelect(item.id)}
    >
      {item.label}
      {position > 0 && (
        <>
          <span className={styles.linkCounter} aria-hidden>
            {PROJECT_PAGE_TEXTS.imageSection.stepCounter(position, itemCount)}
          </span>
          <span className={styles.linkCounterSrOnly}>
            {`, ${PROJECT_PAGE_TEXTS.imageSection.stepPosition(position, itemCount)}`}
          </span>
        </>
      )}
    </HashLink>
  );
}

export const ProjectToc = ({ items }: ProjectTocProps) => {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const clickLockIdRef = useRef<string | null>(null);
  const scrollSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollByPage = (dir: -1 | 1) => {
    const el = linksRef.current;
    if (!el) return;
    const step = clamp(el.clientWidth * 0.7, SCROLL_STEP_MIN, SCROLL_STEP_MAX);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const lockClick = (id: string) => {
    clickLockIdRef.current = id;
    if (scrollSettleTimerRef.current) {
      clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = null;
    }
    setActiveId(id);
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || items.length < MIN_ITEMS) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--project-toc-height",
        `${nav.offsetHeight}px`,
      );
    };

    syncHeight();
    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(nav);
    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--project-toc-height");
    };
  }, [items.length]);

  useEffect(() => {
    const el = linksRef.current;
    if (!el || items.length < MIN_ITEMS) return;

    const syncOverflow = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const left = el.scrollLeft;
      setCanScrollLeft(max > 0 && left > 2);
      setCanScrollRight(max > 0 && left < max - 2);
    };

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (delta === 0) return;
      event.preventDefault();
      el.scrollLeft += delta;
    };

    syncOverflow();
    el.addEventListener("scroll", syncOverflow, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    const resizeObserver = new ResizeObserver(syncOverflow);
    resizeObserver.observe(el);
    window.addEventListener("resize", syncOverflow);

    return () => {
      el.removeEventListener("scroll", syncOverflow);
      el.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncOverflow);
    };
  }, [items]);

  useEffect(() => {
    if (items.length < MIN_ITEMS) return;

    const readSpyOffset = () => {
      const nav = navRef.current;
      const stickyTop = resolveCssLengthPx("--sticky-below-header");
      let offset = stickyTop + resolveCssLengthPx("--project-toc-height");
      if (nav) {
        const rect = nav.getBoundingClientRect();
        if (rect.top <= stickyTop + 0.5) offset = rect.bottom - 1;
      }
      return offset;
    };

    const syncActive = () => {
      if (clickLockIdRef.current) return;

      const offset = readSpyOffset();
      let current = items[0]?.id ?? "";

      for (const item of items) {
        for (const id of [item.id, ...(item.watchIds ?? [])]) {
          const section = document.getElementById(id);
          if (!section) continue;
          if (section.getBoundingClientRect().top <= offset) current = item.id;
        }
      }

      if (isPageAtBottom()) {
        current = items[items.length - 1]?.id ?? current;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!clickLockIdRef.current) {
        syncActive();
        return;
      }

      if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = setTimeout(() => {
        const lockedId = clickLockIdRef.current;
        clickLockIdRef.current = null;
        scrollSettleTimerRef.current = null;

        const lockedEl = lockedId ? document.getElementById(lockedId) : null;
        const lockedTop = lockedEl?.getBoundingClientRect().top;
        const nearSpy =
          lockedId &&
          lockedTop !== undefined &&
          (Math.abs(lockedTop - readSpyOffset()) <= 4 ||
            (isPageAtBottom() && lockedId === items[items.length - 1]?.id));

        if (nearSpy && lockedId) {
          setActiveId(lockedId);
          return;
        }
        syncActive();
      }, SETTLE_MS);
    };

    syncActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActive);
      if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
    };
  }, [items]);

  useEffect(() => {
    const root = linksRef.current;
    if (!root) return;
    const active = root.querySelector<HTMLElement>(`.${styles.linkActive}`);
    if (active) scrollChildIntoViewX(root, active);
  }, [activeId]);

  if (items.length < MIN_ITEMS) return null;

  const wrapClass = [
    styles.linksWrap,
    canScrollLeft ? styles.fadeLeft : "",
    canScrollRight ? styles.fadeRight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav ref={navRef} className={styles.toc} aria-label="On this page">
      <div className={styles.inner}>
        <span className={styles.label}>On this page</span>
        <div className={wrapClass}>
          {canScrollLeft && (
            <button
              type="button"
              className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
              aria-label="Scroll tabs left"
              onClick={() => scrollByPage(-1)}
            >
              <FaChevronLeft size={12} aria-hidden />
            </button>
          )}
          <ul ref={linksRef} className={styles.links}>
            {items.map((item) => (
              <li key={item.id}>
                <TocLink
                  item={item}
                  isActive={activeId === item.id}
                  onSelect={lockClick}
                />
              </li>
            ))}
          </ul>
          {canScrollRight && (
            <button
              type="button"
              className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
              aria-label="Scroll tabs right"
              onClick={() => scrollByPage(1)}
            >
              <FaChevronRight size={12} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
