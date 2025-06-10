import React from "react";

type Website = {
  meta: string;
  favicon: string;
};
export default function SiteMeta({ website }: { website: Website }) {
  console.log(website, "website");
  if (!website) return null;
  const extractMetaTags = (metaString: string): React.ReactNode[] => {
    const metaRegex =
      /<meta[^>]*name=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*\/?>/g;
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
    const inlineScriptRegex =
      /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/g;
    const elements: React.ReactNode[] = [];
    const metaMatches = [...metaString.matchAll(metaRegex)];
    metaMatches.forEach((match, index) => {
      elements.push(
        <meta key={`meta-${index}`} name={match[1]} content={match[2]} />
      );
    });

    const scriptSrcMatches = [...metaString.matchAll(inlineScriptRegex)];
    scriptSrcMatches.forEach((match, index) => {
      const srcWithCache = `${match[1]}${
        match[1].includes("?") ? "&" : "?"
      }t=${Date.now()}`;
      elements.push(
        <script
          key={`script-src-${index}`}
          async
          src={srcWithCache}
          crossOrigin="anonymous"
        />
      );
    });

    const inlineScriptMatches = [...metaString.matchAll(scriptRegex)];
    inlineScriptMatches.forEach((match, index) => {
      if (!match[0].includes("src=")) {
        elements.push(
          <script
            key={`script-inline-${index}`}
            dangerouslySetInnerHTML={{ __html: match[1] }}
          />
        );
      }
    });

    return elements;
  };

  const metaTags = website?.meta ? extractMetaTags(website.meta) : null;

  return (
    <>
      {website?.favicon && (
        <link rel="icon" href={`${website.favicon}?v=${Date.now()}`} />
      )}

      <link rel="preconnect" href="https://www.clarity.ms" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

      {metaTags}
    </>
  );
}
