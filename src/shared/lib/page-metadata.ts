import type { Metadata } from "next";
import { SITE_METADATA } from "@/shared/constants/data";

const DEFAULT_OG_IMAGE = {
  url: "/images/ui/og-image.png",
  width: 1200,
  height: 630,
  alt: SITE_METADATA.ogImageAlt,
};

type OgImageDescriptor = {
  url: string | URL;
  width?: number;
  height?: number;
  alt?: string;
};

type OgImages = string | OgImageDescriptor | Array<string | OgImageDescriptor>;

function toImageList(images?: OgImages): OgImageDescriptor[] {
  if (!images) return [DEFAULT_OG_IMAGE];
  const list = Array.isArray(images) ? images : [images];
  return list.map((image) =>
    typeof image === "string" ? { ...DEFAULT_OG_IMAGE, url: image } : image
  );
}

function twitterImageUrls(images: OgImageDescriptor[]): string[] {
  return images
    .map((image) => image.url)
    .filter((url): url is string | URL => Boolean(url))
    .map((url) => (typeof url === "string" ? url : url.toString()));
}

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  absoluteTitle?: string;
  robots?: Metadata["robots"];
  images?: OgImages;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  robots,
  images,
  imageAlt,
}: CreatePageMetadataOptions): Metadata {
  const ogTitle = absoluteTitle ?? `AxmBro.dev | ${title}`;
  const ogImages = toImageList(images);

  if (imageAlt && ogImages[0]) {
    ogImages[0] = { ...ogImages[0], alt: imageAlt };
  }

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(robots ? { robots } : {}),
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: ogTitle,
      description,
      ...(path ? { url: path } : {}),
      siteName: "AxmBro",
      images: ogImages,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: twitterImageUrls(ogImages),
      creator: "@AxmBro",
    },
  };
}
