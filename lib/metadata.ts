import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/**
 * Builds per-page metadata with correct canonical URL, Open Graph, and Twitter.
 * Use on every page so canonical and social previews are page-specific, not homepage.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteConfig.url}${normalizedPath}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
