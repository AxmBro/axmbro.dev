import type { MetadataRoute } from "next";
import { SITE_BRAND, SITE_METADATA } from "@/shared/constants/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_BRAND.siteName,
    short_name: SITE_BRAND.name,
    description: SITE_METADATA.homeDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
