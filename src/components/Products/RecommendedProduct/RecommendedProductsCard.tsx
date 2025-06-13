"use client";

import React from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge/Badge";
import { Product } from "@/types/Product";
import ProductsInfo from "./ProductsInfo";
import Icon from "./Icon";
import placeholderImage from "../../../../public/categoryLoading.jpg";

interface RecommendedProductsCardProps {
  item: Product;
  layout?: "grid" | "list";
}
const RecommendedProductsCard = React.memo(function RecommendedProductsCard({
  item,
  layout = "grid",
}: RecommendedProductsCardProps) {
  if (!item.final_price) {
    return null;
  }
  return (
    <>
      <div
        className={`
                rounded-xl sm:hover:scale-105 transition-all duration-200
                group relative overflow-hidden
                ${
                  layout === "grid"
                    ? "w-full"
                    : "flex gap-4 w-full border-b pb-4"
                }
                `}
      >
        <div className="absolute -top-1 left-0 z-10">
          <Badge type={item?.badge} />
        </div>
        <div
          className={`relative ${
            layout === "list" ? "w-48 flex-shrink-0" : ""
          }`}
        >
          <Image
            src={item?.thumbnail || placeholderImage}
            alt={item?.title || "Headphone Product"}
            width={160}
            height={160}
            className="object-cover w-full aspect-square"
          />
          <Icon item={item} />
        </div>
        <ProductsInfo item={item} layout={layout} />
      </div>
    </>
  );
});

export default RecommendedProductsCard;
