import type { GalleryImage } from "./gallery-types";

export async function fetchProjectGalleryImages(projectId: string): Promise<GalleryImage[]> {
  const response = await fetch(`/api/project-gallery/${projectId}`);
  if (!response.ok) return [];

  const data = (await response.json()) as { images?: GalleryImage[] };
  return data.images ?? [];
}
