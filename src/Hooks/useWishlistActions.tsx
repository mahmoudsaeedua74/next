"use client";
import { useToast } from "@/components/ui/Toast/use-toast";
import Link from "next/link";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/lib/store/slice/WishlistSlice";
import { Product } from "@/types/Product";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
const showWishlistLink = (
    <Link
        href="/wishlist"
        className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring"
    >
        View Wishlist
    </Link>
);
export default function useWishlistActions() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(
        (state) => state.wishlistSlice.wishlistItems
    );

    const handleAddToWishlist = (product: Product) => {
        const alreadyInWishlist = wishlistItems.some(
            (item) => item.title === product.title
        );

        if (alreadyInWishlist) {
            toast({
                title: "Already in Wishlist",
                description: "This product is already in your wishlist",
                variant: "destructive",
                action: showWishlistLink,
            });
            return false;
        } else {
            dispatch(addToWishlist(product));
            const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
            localStorage.setItem(
                "wishlist",
                JSON.stringify([...stored, product])
            );

            toast({
                title: "Added to Wishlist",
                description: "Product has been added to your wishlist",
                action: showWishlistLink,
            });
            return true;
        }
    };
    const handleRemoveFromWishlist = (product: Product) => {
        dispatch(removeFromWishlist(product));
        const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const updatedWishlist = stored.filter(
            (item: Product) => item.title !== product.title
        );
        if (updatedWishlist.length > 0) {
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        } else {
            localStorage.removeItem("wishlist");
        }
        toast({
            title: "Removed from Wishlist",
            description: "Product has been removed from your wishlist",
        });
    };
    const isInWishlist = (product: Product) => {
        return wishlistItems.some((item) => item.title === product.title);
    };
    return {
        handleAddToWishlist,
        handleRemoveFromWishlist,
        isInWishlist,
        wishlistItems,
    };
}
