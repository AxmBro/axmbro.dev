"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/shared/ui/motion";
import { useRevealInView } from "@/shared/ui/motion";

export type UseRailPulseFlashOptions = {
  pulseOnMount?: boolean;
  pulseIntervalMs?: number;
  inViewRef?: RefObject<Element | null>;
  hoverTargetRef?: RefObject<Element | null>;
};

export function useRailPulseFlash({
  pulseOnMount = false,
  pulseIntervalMs,
  inViewRef,
  hoverTargetRef,
}: UseRailPulseFlashOptions = {}) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const wasInView = useRef(false);
  const isPointerInsideRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const endsPendingRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const emptyInViewRef = useRef<Element | null>(null);
  const viewRef = inViewRef ?? emptyInViewRef;
  const inView = useRevealInView(viewRef, { once: false });

  const tryFlashRailDot = useCallback(() => {
    const dot = dotRef.current;
    const pulse = pulseRef.current;
    if (!dot || !pulse || reduceMotion || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    endsPendingRef.current = 2;
    delete dot.dataset.railDotFlash;
    delete pulse.dataset.railPulseFlash;
    void dot.offsetWidth;
    void pulse.offsetWidth;
    dot.dataset.railDotFlash = "";
    pulse.dataset.railPulseFlash = "";
  }, [reduceMotion]);

  const finishFlash = useCallback(() => {
    const dot = dotRef.current;
    const pulse = pulseRef.current;
    isAnimatingRef.current = false;
    endsPendingRef.current = 0;
    if (dot) {
      delete dot.dataset.railDotFlash;
    }
    if (pulse) {
      delete pulse.dataset.railPulseFlash;
    }

    if (isPointerInsideRef.current) {
      tryFlashRailDot();
    }
  }, [tryFlashRailDot]);

  useEffect(() => {
    const dot = dotRef.current;
    const pulse = pulseRef.current;
    if (!dot || !pulse) return;

    const onAnimationEnd = (event: AnimationEvent) => {
      if (!isAnimatingRef.current) return;
      if (event.target !== dot && event.target !== pulse) return;

      endsPendingRef.current -= 1;
      if (endsPendingRef.current > 0) return;

      finishFlash();
    };

    dot.addEventListener("animationend", onAnimationEnd);
    pulse.addEventListener("animationend", onAnimationEnd);

    return () => {
      dot.removeEventListener("animationend", onAnimationEnd);
      pulse.removeEventListener("animationend", onAnimationEnd);
    };
  }, [finishFlash]);

  useEffect(() => {
    if (!inViewRef) return;

    if (!inView) {
      wasInView.current = false;
      return;
    }

    if (wasInView.current) return;

    wasInView.current = true;
    tryFlashRailDot();
  }, [inView, inViewRef, tryFlashRailDot]);

  useEffect(() => {
    if (!hoverTargetRef) return;

    const target = hoverTargetRef.current;
    if (!target) return;

    const handlePointerEnter = () => {
      isPointerInsideRef.current = true;
      tryFlashRailDot();
    };

    const handlePointerLeave = () => {
      isPointerInsideRef.current = false;
    };

    target.addEventListener("pointerenter", handlePointerEnter);
    target.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      target.removeEventListener("pointerenter", handlePointerEnter);
      target.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [hoverTargetRef, tryFlashRailDot]);

  useEffect(() => {
    if (!pulseOnMount || reduceMotion) return;

    const timeoutId = window.setTimeout(() => {
      tryFlashRailDot();
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [pulseOnMount, reduceMotion, tryFlashRailDot]);

  useEffect(() => {
    if (!pulseIntervalMs || reduceMotion) return;

    const intervalId = window.setInterval(() => {
      if (inViewRef && !inView) return;
      tryFlashRailDot();
    }, pulseIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [pulseIntervalMs, reduceMotion, inView, inViewRef, tryFlashRailDot]);

  return { dotRef, pulseRef };
}
