"use client";
import { useRecommended } from "@/lib/api/queries";
import React from "react";
import { Product } from "@/types/Product";
import dynamic from "next/dynamic";
const Heading = dynamic(() => import("@/components/common/Heading"));
const HeroProductsCard = dynamic(() => import("./HeroProductsCard"));
const HeroProductsSkeletonCard = dynamic(
    () => import("./HeroProductsSkeletonCard")
);
export default function HeroProducts() {
    const { data: recommendedProducts, isLoading } = useRecommended();
    return (
        <section>
            <div className="mb-7">
                <Heading
                    title={recommendedProducts?.salesProducts[0]?.sectionTitle}
                />
            </div>
            <div className="grid grid-cols-1 text-[] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                {isLoading ? (
                    <HeroProductsSkeletonCard />
                ) : (
                    recommendedProducts?.salesProducts
                        ?.slice(1, recommendedProducts?.salesProducts?.length)
                        ?.map((item: Product) => (
                            <HeroProductsCard key={item.id} item={item} />
                        ))
                )}
            </div>
        </section>
    );
}
