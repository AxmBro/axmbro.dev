// Before hydration: stash hash and scroll to top. See scroll-to-hash.ts.
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
