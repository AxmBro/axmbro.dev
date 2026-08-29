/** Hash scroll + `PAGE_HASH_CHANGE` for cross-page / FAQ targets. Offsets: `globals.scss`. */
export const PAGE_HASH_CHANGE = "pagehashchange";

/** FAQ accordion open delay before `#faq-*` scroll */
export const FAQ_HASH_SCROLL_DELAY_MS = 280;

export const notifyPageHashChange = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PAGE_HASH_CHANGE));
};

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
