import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  buildTitle,
  metadataConfig,
} from "@/features/shared/components/metadata-config";

interface SEOConfigProps {
  title?: string;
  description?: string;
  path?: string;
  schema?: Record<string, unknown>;
}

export const SEOConfig = ({
  title,
  description = metadataConfig.defaultDescription,
  path = "/",
  schema,
}: SEOConfigProps): ReactNode => {
  const fullTitle = buildTitle(title);
  const canonical = `${metadataConfig.baseUrl}${path}`;
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: metadataConfig.siteName,
    url: metadataConfig.baseUrl,
  };
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <script type="application/ld+json">
        {JSON.stringify(schema ?? websiteSchema)}
      </script>
    </Helmet>
  );
};
