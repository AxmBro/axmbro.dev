"use client";

import { useServerInsertedHTML } from "next/navigation";

const HASH_SCROLL_INIT_SCRIPT = `
history.scrollRestoration = "manual";

if (location.hash) {
  var hashParts = location.hash.replace(/^#/, "").split("#").filter(Boolean);
  var hash = hashParts.length ? "#" + hashParts[0] : "";

  if (hash) {
    try {
      sessionStorage.setItem("pending-hash", hash);
      sessionStorage.setItem("pending-hash-path", location.pathname + location.search);
    } catch {}

    history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
  }
}
`.trim();

export const HashScrollInit = () => {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: HASH_SCROLL_INIT_SCRIPT }} />
  ));

  return null;
};
