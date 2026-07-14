import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AxmBro.dev | Minecraft Bedrock UI Engineer",
    short_name: "AxmBro",
    description:
      "Computer Science student and Minecraft Bedrock UI Engineer building custom JsonUI and responsive web interfaces.",
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
