"use client";
import React from "react";
import { Product } from "@/types/Product";
import { motion } from "framer-motion";
import { Button } from "../../ui/Button/Button";
import Link from "next/link";
import { useRecommended } from "@/lib/api/queries";
import dynamic from "next/dynamic";
const RecommendedProductsCard = dynamic(
  () => import("./RecommendedProductsCard")
);
const RecommendedProductsSkeletonCard = dynamic(
  () => import("./RecommendedProductsSkeletonCard")
);
const AnimatedHeading = dynamic(() => import("../../common/AnimatedHeading"));
export default function RecommendedProducts() {
  const { data: recommendedProducts, isLoading } = useRecommended();
  // sectionTitle === null the section will hide
  if (recommendedProducts?.suggestedProducts?.sectionTitle === null) {
    return;
  }

  return (
    <section className=" text-center">
      <div className="mb-8">
        <AnimatedHeading>
          {recommendedProducts?.suggestedProducts?.sectionTitle}
        </AnimatedHeading>
      </div>
      <div className="grid text-start p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {isLoading ? (
          <RecommendedProductsSkeletonCard />
        ) : (
          recommendedProducts?.suggestedProducts?.products?.map(
            (item: Product) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.1, once: false }}
                transition={{ duration: 0.5 }}
                className="col-span-1"
              >
                <RecommendedProductsCard item={item} key={item.id} />
              </motion.div>
            )
          )
        )}
      </div>
      <Link
        href="/products"
        aria-label="Browse all products on our website"
        title="Browse all products on our website"
      >
        <Button variant="seeMore">See all products</Button>
      </Link>
    </section>
  );
}
