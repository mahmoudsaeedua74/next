import OfferBadge from "@/components/ui/Badge/OfferBadge";
import { Button } from "@/components/ui/Button/Button";
import { Product } from "@/types/Product";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProductsInfo({
  layout,
  item,
}: {
  layout?: string;
  item: Product;
}) {
  return (
    <div className={`${layout === "grid" ? "p-3" : "flex-grow p-2"}`}>
      <Link
        href={item.link}
        target="_blank"
        className="text-sm font-medium line-clamp-2 heroProduct-text transition-colors cursor-pointer"
      >
        {item.title}
      </Link>
      <div className="flex items-center mt-2">
        <div className="flex items-center themed-text">
          <span className="text-sm font-medium mr-1">{item.rate ?? 0}</span>
          <Star size={16} fill="#FF9900" />
        </div>
        <span className="text-xs text-gray-500 ml-1">
          ({item.reviews ?? 0}k)
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <span className="text-base font-semibold text-[#dc2626]">
          {item.final_price} {item.currency}
        </span>
        {item.price_before && (
          <span className="text-sm text-gray-500 line-through">
            {item.price_before}
            {item.currency}
          </span>
        )}
        {item.offer && <OfferBadge offer={item.offer} />}
      </div>
      <div
        className={`${
          layout === "list"
            ? "sm:translate-y-40  group-hover:translate-y-10"
            : "sm:translate-y-40 w-full sm:group-hover:translate-y-0"
        } transition-all duration-200  `}
      >
        <Link href={item.link} target="_blank" className="block mt-2">
          <Button variant="getItem" className="w-full">
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
