/**
 * Hash navigation. Offsets: globals.scss (--header-offset, scroll-margin rules).
 *
 * Flow:
 *   hash-scroll-init.js - strip hash before first paint, store in sessionStorage
 *   HashLink - cross-page clicks store pending hash, same-page scrolls in place
 *   HashScroll - restore pending hash after route, listen to hashchange
 *
 * Section id + Link:
 *   <ScreenSection id="commission-process" />
 *   <Link href="/#commission-process">...</Link>
 *
 * Extra gap under sticky header - id + data-scroll-anchor + HashLink:
 *   <div id="social-links" data-scroll-anchor />
 *   <HashLink href="/contact#social-links">...</HashLink>
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
