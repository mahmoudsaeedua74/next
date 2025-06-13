"use client";
import Link from "next/link";
import { useHeader } from "@/lib/api/queries";
import { Header } from "@/types/navbar";
import CategoryDropdown from "./CategoryDropdown ";

export default function BottomNav() {
  const { data, isLoading } = useHeader();

  return (
    <div className="border">
      <div className="flex gap-12 items-center contain">
        <div>
          <CategoryDropdown />
        </div>
        <div>
          <ul className="flex gap-6 text-[#0661e9] cursor-pointer">
            {isLoading ? (
              <>
                <li>Wishlist</li>
                <li>Compare</li>
                <li>All Products</li>
                <li>Home</li>
              </>
            ) : (
              data?.map((item: Header) => {
                let pageLink = item.pages?.[0]?.link || "/";

                if (pageLink === "/products/show/") {
                  pageLink = "/products";
                }
                if (pageLink === "/compare") {
                  pageLink = "/Compare";
                }
                if (pageLink === "/wishlist") {
                  pageLink = "/Wishlist";
                }
                if (pageLink === "https://toollistings.com/") {
                  pageLink = "/";
                }

                const isExternalLink = pageLink.startsWith("http");

                if (isExternalLink) {
                  return (
                    <li key={item.id}>
                      <Link
                        href={pageLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={item.id}>
                      <Link href={pageLink}>
                        {item.title}
                      </Link>
                    </li>
                  );
                }
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}