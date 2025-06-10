import "./globals.css";
import { Toaster } from "@/components/ui/Toast/toaster";
import AppProvider from "@/lib/QueryClientProvider";
import { ThemeProvider } from "@/lib/context/Them";
import { Metadata } from "next";
import Script from "next/script";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getMetadata() {
  if (!BASEURL) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
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

// Function to extract meta tags from HTML string
function extractMetaFromString(metaString: string) {
  if (!metaString) return {};

  const metaRegex =
    /<meta[^>]*name=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*\/?>/g;
  const metaTags: Record<string, string> = {};

  let match;
  while ((match = metaRegex.exec(metaString)) !== null) {
    metaTags[match[1]] = match[2];
  }

  return metaTags;
}

export async function generateMetadata(): Promise<Metadata> {
  const website = await getMetadata();
  const dynamicMeta = extractMetaFromString(website?.meta || "");

  return {
    title: website?.title || "Default Title",
    description: website?.description || "Default Description",
    keywords: website?.keywords || "default, keywords",
    authors: [{ name: website?.company_name || "Default Author" }],
    robots: "index, follow",
    // Add your dynamic meta tags here
    other: {
      ...dynamicMeta,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const website = await getMetadata();

  // Extract scripts from meta string
  const extractScripts = (metaString: string) => {
    if (!metaString) return [];
    const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/g;
    const scripts: string[] = [];
    let match;
    while ((match = scriptRegex.exec(metaString)) !== null) {
      scripts.push(match[1]);
    }
    return scripts;
  };

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
