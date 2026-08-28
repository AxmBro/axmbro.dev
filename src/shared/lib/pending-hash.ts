import { normalizePathname } from "@/shared/lib/nav-active";
import { normalizePageHash } from "@/shared/lib/scroll-to-hash";

const PENDING_HASH_KEY = "pending-hash";
const PENDING_HASH_PATH_KEY = "pending-hash-path";

export const clearPendingHash = () => {
  try {
    sessionStorage.removeItem(PENDING_HASH_KEY);
    sessionStorage.removeItem(PENDING_HASH_PATH_KEY);
  } catch {}
};

export const storePendingHash = (path: string, hash: string) => {
  try {
    sessionStorage.setItem(PENDING_HASH_KEY, normalizePageHash(hash));
    sessionStorage.setItem(PENDING_HASH_PATH_KEY, path);
  } catch {}
};

export const restorePendingHash = () => {
  try {
    const pendingHash = sessionStorage.getItem(PENDING_HASH_KEY);
    const pendingPath = sessionStorage.getItem(PENDING_HASH_PATH_KEY);
    if (!pendingHash || !pendingPath) return false;

    clearPendingHash();

    // Ignore query: affiliate params (?fbclid, ?igsh) must not block the restore.
    if (normalizePathname(window.location.pathname) !== normalizePathname(pendingPath)) {
      return false;
    }

    const currentPath = window.location.pathname + window.location.search;
    history.replaceState(null, "", currentPath + normalizePageHash(pendingHash));
    return true;
  } catch {
    return false;
  }
};
