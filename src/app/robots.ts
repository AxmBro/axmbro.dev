import { MetadataRoute } from "next";
import { SITE_ORIGIN, SITE_PATHS } from "@/shared/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_ORIGIN}${SITE_PATHS.sitemapXml}`,
  };
}
