import { getImageProps } from "next/image";
import { GALLERY_IMAGE_QUALITY } from "./gallery-image-config";

const loadedOrPending = new Set<string>();

export function preloadGalleryImage(
  src: string | null | undefined,
  sizes: string,
  onLoad?: (loadedSrc: string) => void,
): void {
  if (!src || loadedOrPending.has(src)) return;

  loadedOrPending.add(src);

  // Ask next/image for the exact attributes the rendered element would get, then
  // let the browser resolve `srcSet` + `sizes` itself. Preloading a hand-guessed
  // width would warm a different optimizer URL than the one that ends up shown.
  const { props } = getImageProps({
    src,
    alt: "",
    fill: true,
    quality: GALLERY_IMAGE_QUALITY,
    sizes,
  });

  const image = new window.Image();
  image.onload = () => onLoad?.(src);
  image.onerror = () => loadedOrPending.delete(src);
  image.sizes = props.sizes ?? sizes;
  image.srcset = props.srcSet ?? "";
  image.src = props.src;
}
