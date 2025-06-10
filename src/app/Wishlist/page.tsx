// src/app/wishlist/page.tsx
"use client";

import { useEffect, useState } from "react";
import { setWishlistItems } from "@/lib/store/slice/WishlistSlice";
import { Product } from "@/types/Product";
import { useSuggested } from "@/lib/api/queries";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import dynamic from "next/dynamic";
const SkeletonCard = dynamic(
    () => import("@/components/Wishlist/SkeletonCard")
);
const EmptyCart = dynamic(() => import("@/components/common/EmptyCart"));
const Heading = dynamic(() => import("@/components/common/Heading"));
const RecommendedProductsCard = dynamic(
    () =>
        import(
            "@/components/Products/RecommendedProduct/RecommendedProductsCard"
        )
);
const ProductsCard = dynamic(
    () => import("@/components/Wishlist/ProductsCard")
);
export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(
        (state) => state.wishlistSlice.wishlistItems
    );
    const { data } = useSuggested("wishlist");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (stored.length > 0) {
            dispatch(setWishlistItems(stored));
        }
        setLoading(false);
    }, [dispatch]);
    useEffect(() => {
        if (wishlistItems.length === 0) {
            localStorage.removeItem("wishlist");
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
    }, [wishlistItems]);
    if (loading) {
        return <SkeletonCard />;
    }
    if (wishlistItems.length === 0) {
        return (
            <EmptyCart title="Your wishlist is empty... Please add products to your wishlist." />
        );
    }
    return (
        <div className="container mx-auto px-4 py-8 mb-20">
            <h1 className="text-2xl font-bold mb-6">
                My Wishlist ({wishlistItems.length})
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems?.map((product: Product) => (
                    <ProductsCard product={product} key={product.id} />
                ))}
            </div>
            <div className="mt-8 space-y-12">
                <Heading
                    title="We Suggested These Products For You"
                    className="!text-start"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {data?.map((product: Product) => (
                        <RecommendedProductsCard
                            item={product}
                            key={product.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
