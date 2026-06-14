import { MetadataRoute } from "next";
import { PROJECTS } from "@/shared/constants/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://axmbro.dev";

  const baseRoutes: MetadataRoute.Sitemap = [
    "",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/projects",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.url).map((project) => ({
    url: `${baseUrl}/projects/${project.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...baseRoutes, ...projectRoutes];
}
