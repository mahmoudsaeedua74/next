import "./globals.css";
import { Toaster } from "@/components/ui/Toast/toaster";
import AppProvider from "@/lib/QueryClientProvider";
import { ThemeProvider } from "@/lib/context/Them";
import SiteMeta from "@/components/common/SiteMeta";
import { Metadata } from "next";

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
    
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <AppProvider>
                    <SiteMeta website={website} />
                    <ThemeProvider>{children}</ThemeProvider>
                    <Toaster />
                </AppProvider>
            </body>
        </html>
    );
}
