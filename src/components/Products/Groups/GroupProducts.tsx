"use client";

import RecommendedProductsCard from "@/components/Products/RecommendedProduct/RecommendedProductsCard";
import RecommendedProductsSkeletonCard from "@/components/Products/RecommendedProduct/RecommendedProductsSkeletonCard";
import { useGroup } from "@/lib/api/queries";
import { Product } from "@/types/Product";
import React from "react";

export default function GroupProducts({ groupId }: { groupId: number }) {
    const { data, isLoading } = useGroup(groupId);

    if (isLoading) {
        return (
            <div className="grid text-start p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                <RecommendedProductsSkeletonCard />
            </div>
        );
    }

    return (
        <div className="text-start p-4 items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {data?.map((product: Product) => (
                <RecommendedProductsCard key={product.id} item={product} />
            ))}
        </div>
    );
}
