import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AxmBro Portfolio",
    short_name: "AxmBro",
    description: "Personal portfolio of AxmBro - Programmer, MCBE JsonUI Developer, Web Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/ui/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
