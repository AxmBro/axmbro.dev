import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AxmBro.dev | MCBE UI Architect & Developer",
    short_name: "AxmBro",
    description: "Computer Science student and UI Architect from Poland. Specializing in engineering custom Minecraft Bedrock interfaces (JsonUI) and modern web applications.",
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
