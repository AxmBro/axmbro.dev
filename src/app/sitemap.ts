import { MetadataRoute } from "next";
import { PROJECTS } from "@/shared/constants/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://axmbro.dev";

  // Base routes
  const baseRoutes = [
    "",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/projects",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic project routes
  const projectRoutes = PROJECTS.filter((p) => p.slug).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...baseRoutes, ...projectRoutes];
}
