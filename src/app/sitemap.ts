import type { MetadataRoute } from "next";
import { PROJECTS } from "@/shared/constants/data";
import { projectDetailPath, ROUTES } from "@/shared/constants/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://axmbro.dev";

  const staticPaths = [
    ROUTES.home,
    ROUTES.commissions,
    ROUTES.contact,
    ROUTES.sitemap,
    ROUTES.privacyPolicy,
    ROUTES.termsOfUse,
    ROUTES.projects,
  ] as const;

  const baseRoutes: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === ROUTES.home ? "weekly" : "monthly",
    priority: route === ROUTES.home ? 1.0 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.url).map((project) => ({
    url: `${baseUrl}${projectDetailPath(project.url!)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...baseRoutes, ...projectRoutes];
}
