/**
 * Hash navigation. Offsets: globals.scss
 * (`--header-sticky-height`, `--project-toc-height`, scroll-margin).
 *
 * Flow:
 *   HashScrollInit - stash hash before first paint (useServerInsertedHTML)
 *   HashLink - cross-page pending hash; same-page replaceState + scrollToHash on every click
 *   HashScroll - restore pending hash after route / hashchange
 *
 * Section: <ScreenSection id="..." /> + Link/HashLink href="#..."
 * Extra gap under header: id + data-scroll-anchor (see hash-navigation.mdc)
 */
export const parseHashId = (hash: string) =>
  decodeURIComponent(hash.replace(/^#/, "").split("#")[0]);

export const normalizePageHash = (hash: string) => {
  const id = parseHashId(hash);
  return id ? `#${id}` : "";
};

export function scrollToHash(hash?: string, behavior: ScrollBehavior = "smooth") {
  const raw = hash ?? (typeof window !== "undefined" ? window.location.hash : "");
  const id = parseHashId(raw);
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
  window.scrollTo({ top, behavior });
  return true;
}

export const repairBrokenHash = () => {
  if (typeof window === "undefined") return;

  const raw = window.location.hash;
  if (!raw || !raw.includes("#", 1)) return;

  const path = window.location.pathname + window.location.search;
  const hash = normalizePageHash(raw);
  if (!hash) return;

  history.replaceState(null, "", `${path}${hash}`);
};
