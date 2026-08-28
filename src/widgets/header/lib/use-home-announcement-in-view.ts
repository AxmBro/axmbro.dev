import { useEffect, useState, type RefObject } from "react";

export const useHomeAnnouncementInView = (
  isHome: boolean,
  barRef: RefObject<HTMLDivElement | null>,
  isResponsive: boolean,
) => {
  const [announcementInView, setAnnouncementInView] = useState(isHome);

  useEffect(() => {
    if (!isHome) return;

    const node = document.querySelector("[data-announcement-bar]");
    if (!(node instanceof HTMLElement)) return;

    const headerPx = barRef.current?.offsetHeight ?? 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnnouncementInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `-${headerPx}px 0px 0px 0px`,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [barRef, isHome, isResponsive]);

  return announcementInView;
};
