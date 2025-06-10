import React from "react";
import Head from "next/head";

type Website = {
  meta: string;
  favicon: string;
};

export default function SiteMeta({ website }: { website: Website }) {
  if (!website) return null;

  return (
    <Head>
      {website?.favicon && (
        <link rel="icon" href={`${website.favicon}?v=${Date.now()}`} />
      )}

      <link rel="preconnect" href="https://www.clarity.ms" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

      <div dangerouslySetInnerHTML={{ __html: website?.meta }} />
    </Head>
  );
}
