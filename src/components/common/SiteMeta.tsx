import React from "react";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchWebsiteMeta() {
  if (!BASEURL) return null;

  try {
    const res = await fetch(`${BASEURL}/theme`, {
      next: {
        revalidate: 3600,
        tags: ["website-meta"],
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data?.data?.theme?.website || null;
  } catch (err) {
    console.error("Error fetching metadata:", err);
    return null;
  }
}

function extractMetaElements(metaString: string) {
  if (!metaString) return [];

  const metaRegex =
    /<meta[^>]*name=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*\/?>/g;

  const elements: React.JSX.Element[] = [];
  let match;
  let index = 0;

  while ((match = metaRegex.exec(metaString)) !== null) {
    elements.push(
      <meta key={`dynamic-meta-${index}`} name={match[1]} content={match[2]} />
    );
    index++;
  }

  return elements;
}

export default async function MetaHead() {
  const website = await fetchWebsiteMeta();
  const metaElements = extractMetaElements(website?.meta || "");

  return (
    <>
      <title>{website?.title || "Default Title"}</title>
      <meta
        name="description"
        content={website?.description || "Default Description"}
      />
      <meta
        name="keywords"
        content={website?.keywords || "default, keywords"}
      />
      <meta name="author" content={website?.company_name || "Default Author"} />
      <meta name="robots" content="index, follow" />

      {website?.favicon && (
        <link rel="icon" href={`${website.favicon}?v=${Date.now()}`} />
      )}

      <link rel="preconnect" href="https://www.clarity.ms" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

      {metaElements}
    </>
  );
}
