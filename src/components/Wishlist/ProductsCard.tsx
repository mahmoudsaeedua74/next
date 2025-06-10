"use client";

import React from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types/Product";
import Link from "next/link";
import useWishlistActions from "@/Hooks/useWishlistActions";

export default function ProductsCard({ product }: { product: Product }) {
    const { handleAddToWishlist, isInWishlist, handleRemoveFromWishlist } =
        useWishlistActions();
    const handleWishlistClick = () => {
        if (isInWishlist(product)) {
            handleRemoveFromWishlist(product);
        } else {
            handleAddToWishlist(product);
        }
    };
    return (
        <div className="group block  rounded-md overflow-hidden bg-white shadow hover:shadow-md transition-shadow duration-300">
            <div className="relative w-full">
                <Link href={product.link} target="_blank">
                    <div className="overflow-hidden">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="w-full h-[180px] object-cover transition-shadow duration-300 group-hover:shadow-lg rounded-t-md"
                        />
                    </div>
                </Link>
                <div className="absolute top-2 right-2 z-10">
                    <div
                        onClick={handleWishlistClick}
                        className="w-9 h-9 hover:scale-105 hover:shadow-lg rounded-full shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#dc3545] text-white"
                    >
                        <Heart size={18} fill="white" />
                    </div>
                </div>
            </div>
            <div className="p-3">
                <Link href={product.link} target="_blank">
                    <h3 className="text-sm font-medium line-clamp-2 hover:text-[#FF9900] transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center mt-2">
                    <div className="flex items-center text-[#FF9900]">
                        <span className="text-sm font-medium mr-1">
                            {product.rate ?? 0}
                        </span>
                        <Star size={16} fill="#FF9900" />
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({product.rate ?? 0})
                    </span>
                </div>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-base font-semibold text-[#dc2626]">
                        {product.final_price} {product.currency}
                    </span>
                    {product.price_before && (
                        <span className="text-sm text-gray-500 line-through">
                            {product.price_before}
                            {product.currency}{" "}
                        </span>
                    )}
                    {product.offer && (
                        <span className="bg-[#dc2626] text-white text-xs px-2 py-0.5 rounded-full">
                            {product.offer}% OFF
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
