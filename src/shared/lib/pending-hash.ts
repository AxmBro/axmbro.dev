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

    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== pendingPath) return false;

    history.replaceState(null, "", pendingPath + normalizePageHash(pendingHash));
    return true;
  } catch {
    return false;
  }
};
