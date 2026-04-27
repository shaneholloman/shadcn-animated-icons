import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/llms.txt", "/llms-full.txt", "/skill.md"],
    },
    sitemap: `${SITE.URL}/sitemap.xml`,
  };
}
