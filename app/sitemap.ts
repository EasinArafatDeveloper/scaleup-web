import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { serviceCategories, getAllServices } from "@/data/services";
import { industriesData } from "@/data/industries";
import { caseStudiesData } from "@/data/caseStudies";
import { projectsData } from "@/data/projects";
import { FOUNDER_PATH } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static core routes
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/work",
    "/about",
    FOUNDER_PATH,
    "/contact",
    "/free-audit",
    "/privacy",
    "/terms",
    "/refund-policy"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Service category pages
  const categoryRoutes = serviceCategories.map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  // Sub-service pages
  const subServiceRoutes = getAllServices().map((sub) => ({
    url: `${baseUrl}/services/${sub.categorySlug}/${sub.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  // Industry pages
  const industryRoutes = industriesData.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Case study pages — only the ones linked from a live project on /work
  const linkedStudies = new Set(projectsData.map((p) => p.caseStudySlug).filter(Boolean));
  const caseStudyRoutes = caseStudiesData.filter((s) => linkedStudies.has(s.slug)).map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subServiceRoutes,
    ...industryRoutes,
    ...caseStudyRoutes
  ];
}
