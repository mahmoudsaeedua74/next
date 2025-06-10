"use client";
import React from "react";
import { GitCompareArrows } from "lucide-react";
import useComparActions from "../../Hooks/useComparActions";
export default function CompareClick({ id }: { id: number }) {
    const { handleCompareClick, ids, handleRemove } = useComparActions();
    const isInCompare = ids.includes(Number(id));
    const handleCompare = (id: number) => {
        if (isInCompare) {
            handleRemove(id);
        } else {
            handleCompareClick(id);
        }
    };
    return (
        <button
            aria-label={
                isInCompare ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={() => handleCompare(id)}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isInCompare
                    ? "bg-main text-white"
                    : " themed-text border-main bg-whit"
            }`}
        >
            <GitCompareArrows size={16} />
        </button>
    );
}
