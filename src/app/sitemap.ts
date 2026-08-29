import type { MetadataRoute } from "next";
import { parseProjectDateTimestamp } from "@/entities/project";
import { PROJECTS } from "@/shared/constants/data";
import {
  PRIVACY_POLICY_LAST_UPDATED,
  TERMS_OF_USE_LAST_UPDATED,
  parseLegalLastUpdated,
} from "@/shared/constants/legal";
import { SITE_ORIGIN } from "@/shared/constants/site";
import { projectDetailPath, ROUTES } from "@/shared/constants/routes";

const STATIC_LAST_MODIFIED: Partial<Record<string, Date>> = {
  [ROUTES.privacyPolicy]: parseLegalLastUpdated(PRIVACY_POLICY_LAST_UPDATED),
  [ROUTES.termsOfUse]: parseLegalLastUpdated(TERMS_OF_USE_LAST_UPDATED),
};

function projectLastModified(dateStr?: string): Date | undefined {
  const timestamp = parseProjectDateTimestamp(dateStr);
  return timestamp > 0 ? new Date(timestamp) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    url: `${SITE_ORIGIN}${route}`,
    ...(STATIC_LAST_MODIFIED[route] ? { lastModified: STATIC_LAST_MODIFIED[route] } : {}),
    changeFrequency: route === ROUTES.home ? "weekly" : "monthly",
    priority: route === ROUTES.home ? 1.0 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.url).map((project) => {
    const lastModified = projectLastModified(project.date);

    return {
      url: `${SITE_ORIGIN}${projectDetailPath(project.url!)}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...baseRoutes, ...projectRoutes];
}
