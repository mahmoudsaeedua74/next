import "./globals.css";
import { Toaster } from "@/components/ui/Toast/toaster";
import AppProvider from "@/lib/QueryClientProvider";
import { ThemeProvider } from "@/lib/context/Them";
import { Metadata } from "next";
import parse from "html-react-parser";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
async function getMetadata() {
    if (!BASEURL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        return null;
    }
    try {
        const response = await fetch(`${BASEURL}/theme`,{
            cache: "no-store",
        });
        
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

export async function generateMetadata(): Promise<Metadata> {
  const website = await getMetadata();

  const metadata: Metadata = {
    title: website?.title || "Default Title",
    icons: [{ rel: 'icon', url: website?.favicon || '/favicon.ico' }],
    description: website?.description || "Default Description",
    keywords: website?.keywords || "default, keywords",
    authors: [{ name: website?.company_name || "Default Author" }],
    robots: "index, follow",
  };

  if (website?.meta) {
    metadata.other = {
      rawMeta: website.meta,
    };
  }

  return metadata;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {    
    const website = await getMetadata();
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
            {website?.meta && parse(website.meta)}
            </head>
            <body suppressHydrationWarning>
                <AppProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                    <Toaster />
                </AppProvider>
            </body>
        </html>
    );
}

export const dynamic = 'force-dynamic';
