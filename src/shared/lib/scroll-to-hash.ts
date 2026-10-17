import { getScrollBehavior } from "./motion";

export const parseHashId = (hash: string) => {
  const raw = hash.replace(/^#/, "").split("#")[0];
  try {
    return decodeURIComponent(raw);
  } catch {
    // Malformed escape in a pasted URL (`#%E0`) - no target instead of a thrown URIError.
    return "";
  }
};

// Reveal wrappers start at `translateY(REVEAL_Y)`; `scrollIntoView` and rects include it,
// so a target still mid-reveal would land that many px under the sticky stack.
const translateYOf = (element: Element) => {
  let y = 0;
  for (let node: Element | null = element; node; node = node.parentElement) {
    const transform = getComputedStyle(node).transform;
    if (transform !== "none") y += new DOMMatrixReadOnly(transform).m42;
  }
  return y;
};

/** Scrolls to the `id` in `hash` (default: current URL), under the `html` scroll-padding (`globals.scss`). */
export function scrollToHash(hash?: string, behavior: ScrollBehavior = getScrollBehavior()) {
  const raw = hash ?? (typeof window !== "undefined" ? window.location.hash : "");
  const id = parseHashId(raw);
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const top = target.getBoundingClientRect().top - translateYOf(target) + window.scrollY - padding;
  window.scrollTo({ top, behavior });
  return true;
}
