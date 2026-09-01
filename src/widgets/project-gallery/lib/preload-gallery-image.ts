const loadedOrPending = new Set<string>();

export function preloadGalleryImage(
  src: string | null | undefined,
  onLoad?: (loadedSrc: string) => void,
): void {
  if (!src || loadedOrPending.has(src)) return;

  loadedOrPending.add(src);
  const image = new window.Image();
  image.onload = () => onLoad?.(src);
  image.onerror = () => loadedOrPending.delete(src);
  image.src = src;
}
