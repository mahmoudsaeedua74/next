import { MetadataRoute } from "next";
interface FooterPage {
  link: string;
  title: string;
  id: string;
}
interface PageData {
  slug: string;
  updatedAt?: Date | string;
}
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://findgreenery.com";
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/group`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const dynamicPagesRoutes = await getDynamicPagesRoutes(baseUrl);
  return [...staticPages, ...dynamicPagesRoutes];
}
async function getDynamicPagesRoutes(
  baseUrl: string
): Promise<MetadataRoute.Sitemap> {
  try {
    const pages = await fetchPages();

    return pages.map((page) => ({
      url: `${baseUrl}/page/${page.slug}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Error fetching dynamic page routes for sitemap:", error);
    return [];
  }
}
export async function fetchPages(): Promise<PageData[]> {
  const res = await fetch(`${BASEURL}/footer`, {
    next: { revalidate: 3600 },
  });

  const json = await res.json();

  const menus = json?.data?.menus || [];

  const usefulLinks = menus.find(
    (menu: FooterPage) => menu.title === "Useful Links"
  );

  if (!usefulLinks) return [];

  const pages: PageData[] = usefulLinks.pages
    .filter((page: FooterPage) => !page.link.includes("blog"))
    .map((page: FooterPage) => {
      const slug = page.link.split("/").pop();
      return {
        slug: slug,
        updatedAt: new Date(),
      };
    });

  return pages;
}
