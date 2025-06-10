"use client";
import SkeletonCard from "@/components/Wishlist/SkeletonCard";
import { useFooterLink } from "@/lib/api/queries";
import { useParams } from "next/navigation";
import React from "react";
export default function Page() {
  const params = useParams();
  const footerParam = params.footer as string | undefined;
  const processedParam = footerParam
    ? decodeURIComponent(footerParam).replace(/\s+/g, "_")
    : "";
  const { data, isLoading } = useFooterLink(processedParam);
  if (isLoading) {
    return <SkeletonCard />;
  } 
 
  return (
    <section className="contain" key={processedParam}>
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      )}
    </section>
  );
}
