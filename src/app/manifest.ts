import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/shared/constants/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AxmBro.dev",
    short_name: "AxmBro",
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
