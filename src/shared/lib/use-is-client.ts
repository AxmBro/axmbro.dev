import { useSyncExternalStore } from "react";

export const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
