"use client";
import { Product } from "@/types/Product";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { Heart } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import useComparActions from "../../Hooks/useComparActions";
import TooltipComponent from "../ui/Tooltip/Tooltip";
import useWishlistActions from "@/Hooks/useWishlistActions";
const detailKeys = [
  "Brand",
  "Color",
  "Condition",
  "Hardness",
  "ItemDimensions",
  "Manufacturer",
  "Material",
  "Point Type",
  "Size",
  "Surface Recommendation",
  "UnitCount",
];

export default function ProductsComparCard({ product }: { product: Product }) {
  const { handleAddToWishlist } = useWishlistActions();
  const { handleRemove } = useComparActions();
  return (
    <tr
      key={product.id}
      className="border-b-4 border-gray-200 hover:bg-gray-50 text-sm"
    >
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
        </div>
      </td>
      <td className="py-4 px-4">
        <Link
          href={product.link}
          target="_blank"
          className="font-medium text-gray-900 hover:text-primary  line-clamp-1 "
        >
          {product.title.slice(0, 10)}
        </Link>
      </td>
      <td className="py-4 px-4">
        <span className=" text-[#dc2626]">
          {product.final_price} {product.currency}
        </span>
        {product.price_before && (
          <span className="text-sm text-gray-500 line-through">
            {product.price_before}
            {product.currency}
          </span>
        )}
        {product.offer && (
          <div className="bg-[#dc2626] w-fit text-white text-xs px-2 py-0.5 rounded-full">
            {product.offer}% OFF
          </div>
        )}
      </td>
      {detailKeys?.map((key) => (
        <td key={key} className="py-4 px-4">
          <div className="flex items-center">
            <span className="mr-1">
              {Array.isArray(product.details?.[key]) &&
              product.details[key].length > 0 ? (
                product.details[key]?.map((k, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 py-1 px-2 font-medium rounded-full text-sm whitespace-nowrap"
                  >
                    {k === "null" ? "-" : k}
                  </span>
                ))
              ) : (
                <span className="bg-gray-200 py-1 px-2 font-medium rounded-full text-sm whitespace-nowrap">
                  -
                </span>
              )}
            </span>
          </div>
        </td>
      ))}
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <TooltipComponent
            title="Wishlist"
            customClasses="!bg-[#dc3545]"
            customArrow="!fill-[#dc3545]"
          >
            <div
              onClick={() => handleAddToWishlist(product)}
              className="w-8 h-8 hover:scale-105 hover:shadow-lg rounded-full shadow-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 bg-white text-[#dc3545]"
            >
              <Heart size={18} fill="white" />
            </div>
          </TooltipComponent>
          <TooltipComponent title="Delete">
            <div
              onClick={() => handleRemove(Number(product.id))}
              className="w-8 h-8 hover:scale-105 hover:shadow-lg rounded-full shadow-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 bg-white themed-text"
            >
              <MdDeleteForever size={16} />
            </div>
          </TooltipComponent>
          <TooltipComponent
            title="Buy Now"
            customClasses="!bg-[#0d6efd]"
            customArrow="!fill-[#0d6efd]"
          >
            <Link
              href={product.link}
              className="w-8 h-8 hover:scale-105 hover:shadow-lg rounded-full shadow-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 bg-white text-[#0d6efd]"
            >
              <GiShoppingCart size={16} />
            </Link>
          </TooltipComponent>
        </div>
      </td>
    </tr>
  );
}
