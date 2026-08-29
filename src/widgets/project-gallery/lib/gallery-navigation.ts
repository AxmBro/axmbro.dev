import type { GalleryPosition } from "./gallery-types";

export function advanceImagePosition(
  position: GalleryPosition,
  projectCount: number,
  imageCount: number,
): GalleryPosition {
  if (projectCount === 0) return position;

  if (imageCount > 0 && position.imageIndex < imageCount - 1) {
    return { ...position, imageIndex: position.imageIndex + 1 };
  }

  return {
    projectIndex: (position.projectIndex + 1) % projectCount,
    imageIndex: 0,
  };
}

export function nextProjectPosition(
  position: GalleryPosition,
  projectCount: number,
): GalleryPosition {
  if (projectCount === 0) return position;

  return {
    projectIndex: (position.projectIndex + 1) % projectCount,
    imageIndex: 0,
  };
}

export function prevProjectPosition(
  position: GalleryPosition,
  projectCount: number,
): GalleryPosition {
  if (projectCount === 0) return position;

  return {
    projectIndex: (position.projectIndex - 1 + projectCount) % projectCount,
    imageIndex: 0,
  };
}

export function nextPhotoInProject(
  position: GalleryPosition,
  imageCount: number,
): GalleryPosition {
  if (imageCount <= 1) return position;

  return {
    ...position,
    imageIndex: (position.imageIndex + 1) % imageCount,
  };
}
