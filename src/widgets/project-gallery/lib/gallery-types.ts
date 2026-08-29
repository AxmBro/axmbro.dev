import type { ProjectType } from "@/shared/constants/data";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
};

export type GalleryProjectMeta = {
  url: string;
  title: string;
  type?: ProjectType;
  fallbackSrc?: string | null;
};

export type GalleryPosition = {
  projectIndex: number;
  imageIndex: number;
};
