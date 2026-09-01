"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  REVEAL_ACCENT_TITLE_VIEWPORT_MARGIN,
  useReducedMotion,
  useRevealInView,
} from "@/shared/ui/motion";
import styles from "./project-accent-title.module.scss";

interface ProjectAccentTitleProps {
  accentColor: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
  startWhen?: "inView" | "delay";
  delay?: number;
  linkActive?: boolean;
}

export function ProjectAccentTitle({
  accentColor,
  as: Tag = "h2",
  className,
  children,
  startWhen = "inView",
  delay = 0,
  linkActive = false,
}: ProjectAccentTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Cards: own -12% on the heading; hero uses startWhen="delay" (mount), not this margin.
  const inView = useRevealInView(titleRef, {
    once: true,
    margin: REVEAL_ACCENT_TITLE_VIEWPORT_MARGIN,
  });
  const reduceMotion = useReducedMotion();
  const hasStarted = useRef(false);
  const handoffPendingRef = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const beginReveal = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (reduceMotion) return;

    requestAnimationFrame(() => setIsRevealing(true));
  }, [reduceMotion]);

  const handoffRevealToHover = useCallback(() => {
    const el = titleRef.current;
    if (!el) return;

    // Freeze current animated color so hover handoff does not flash white.
    el.style.color = getComputedStyle(el).color;
    handoffPendingRef.current = true;
    setIsRevealing(false);
  }, []);

  useLayoutEffect(() => {
    if (!handoffPendingRef.current || !titleRef.current) return;

    handoffPendingRef.current = false;
    titleRef.current.style.color = "";
  }, [linkActive, isRevealing]);

  useEffect(() => {
    if (startWhen !== "inView" || !inView) return;

    const timeoutId = window.setTimeout(beginReveal, delay * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [inView, startWhen, delay, beginReveal]);

  useEffect(() => {
    if (startWhen !== "delay") return;

    const timeoutId = window.setTimeout(beginReveal, delay * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [startWhen, delay, beginReveal]);

  useEffect(() => {
    if (linkActive && isRevealing) {
      handoffRevealToHover();
    }
  }, [linkActive, isRevealing, handoffRevealToHover]);

  const showHovered = linkActive && !isRevealing;

  const handleAnimationEnd = (event: AnimationEvent<HTMLHeadingElement>) => {
    if (event.animationName !== "project-accent-reveal") return;
    setIsRevealing(false);
  };

  return (
    <Tag
      ref={titleRef}
      style={{ "--project-accent-color": accentColor } as CSSProperties}
      className={[
        styles.title,
        className,
        isRevealing ? styles.reveal : "",
        showHovered ? styles.hovered : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </Tag>
  );
}
