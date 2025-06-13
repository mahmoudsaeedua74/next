import "./globals.css";
import { Toaster } from "@/components/ui/Toast/toaster";
import AppProvider from "@/lib/QueryClientProvider";
import { ThemeProvider } from "@/lib/context/Them";
import { Metadata } from "next";
import Script from "next/script";
import React from "react";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getMetadata() {
  if (!BASEURL) {
    return null;
  }
  try {
    const response = await fetch(`${BASEURL}/theme`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.theme?.website;
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
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

function extractScripts(metaString: string) {
  if (!metaString) return [];
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/g;
  const scripts: string[] = [];
  let match;
  while ((match = scriptRegex.exec(metaString)) !== null) {
    scripts.push(match[1]);
  }
  return scripts;
}

export async function generateMetadata(): Promise<Metadata> {
  const website = await getMetadata();

  return {
    title: website?.title || "Default Title",
    description: website?.description || "Default Description",
    keywords: website?.keywords || "default, keywords",
    authors: [{ name: website?.company_name || "Default Author" }],
    robots: "index, follow",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const website = await getMetadata();

  const metaElements = extractMetaElements(website?.meta || "");
  const scripts = extractScripts(website?.meta || "");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {website?.favicon && (
          <link rel="icon" href={`${website.favicon}?v=${Date.now()}`} />
        )}

        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        {metaElements}
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster />
        </AppProvider>
        {scripts.map((src, index) => (
          <Script
            key={index}
            src={src}
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
          />
        ))}
      </body>
    </html>
  );
}
