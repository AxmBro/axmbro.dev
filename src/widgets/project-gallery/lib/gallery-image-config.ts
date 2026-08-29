const LAYOUT_WIDTH = 1024;
const LAYOUT_HEIGHT = Math.round((LAYOUT_WIDTH * 9) / 16);

export const GALLERY_IMAGE_QUALITY = 100;

export const GALLERY_IMAGE_SIZES_FALLBACK = `(max-width: 992px) 100vw, ${LAYOUT_WIDTH}px`;

export function getGalleryImageSizes(width: number, height: number): string {
  if (width <= 0 || height <= 0) return GALLERY_IMAGE_SIZES_FALLBACK;

  const scale = Math.min(LAYOUT_WIDTH / width, LAYOUT_HEIGHT / height);
  const renderedWidth = Math.max(1, Math.ceil(width * scale));

  return `(max-width: 992px) 100vw, ${renderedWidth}px`;
}
