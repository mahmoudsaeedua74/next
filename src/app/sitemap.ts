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

interface MainCategory {
  id: number;
  name: string;
  cover: string;
  categories: Record<string, string>;
}

interface CategoryResponse {
  data: {
    main_categories: MainCategory[];
  };
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
  const categoryRoutes = await getCategoryRoutes(baseUrl);
  
  return [...staticPages, ...dynamicPagesRoutes, ...categoryRoutes];
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

async function getCategoryRoutes(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  try {
    const categories = await fetchCategories();
    const routes: MetadataRoute.Sitemap = [];

    categories.forEach((mainCategory) => {
      // Add only main category route
      const mainCategorySlug = createSlug(mainCategory.name);
      routes.push({
        url: `${baseUrl}/category/${mainCategorySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });
    });

    return routes;
  } catch (error) {
    console.error("Error fetching category routes for sitemap:", error);
    return [];
  }
}

async function fetchCategories(): Promise<MainCategory[]> {
  try {
    const res = await fetch(`${BASEURL}/main_categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: CategoryResponse = await res.json();
    return json?.data?.main_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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