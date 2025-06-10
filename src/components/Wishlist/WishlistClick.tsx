"use client";

import { Product } from "@/types/Product";
import { Heart } from "lucide-react";
import React from "react";
import useWishlistActions from "@/Hooks/useWishlistActions";

export default function WishlistClick({ item }: { item: Product }) {
    const { handleAddToWishlist, isInWishlist, handleRemoveFromWishlist } =
        useWishlistActions();
    const handleWishlistClick = () => {
        if (isInWishlist(item)) {
            handleRemoveFromWishlist(item);
        } else {
            handleAddToWishlist(item);
        }
    };

    const inWishlist = isInWishlist(item);
    return (
        <button
            onClick={handleWishlistClick}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-8 z-10 h-8 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                inWishlist
                    ? "bg-[#dc3545] text-white"
                    : "bg-white text-[#dc3545] border border-[#dc3545] hover:bg-[#dc3545] hover:text-white"
            }`}
        >
            <Heart size={16} fill={inWishlist ? "white" : "none"} />
        </button>
    );
}
