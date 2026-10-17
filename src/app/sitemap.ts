import type { MetadataRoute } from "next";
import { getProjectsWithPage, parseProjectDateTimestamp } from "@/entities/project";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    ROUTES.home,
    ROUTES.commissions,
    ROUTES.contact,
    ROUTES.sitemap,
    ROUTES.privacyPolicy,
    ROUTES.termsOfUse,
    ROUTES.projects,
  ] as const;

  // Only url + lastModified: Google ignores priority and changeFrequency.
  const baseRoutes: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${SITE_ORIGIN}${route}`,
    ...(STATIC_LAST_MODIFIED[route] ? { lastModified: STATIC_LAST_MODIFIED[route] } : {}),
  }));

  const projectRoutes: MetadataRoute.Sitemap = getProjectsWithPage().map((project) => {
    const lastModified = projectLastModified(project.date);

    return {
      url: `${SITE_ORIGIN}${projectDetailPath(project.url)}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...baseRoutes, ...projectRoutes];
}
