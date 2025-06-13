"use client";
import Image from "next/image";
import { Groups } from "@/types/Product";
import React, { useState } from "react";
import Link from "next/link";
import placeholderImage from "../../../public/categoryLoading.jpg";
export default function GiftCard({ item }: { item: Groups }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc =
    imgError || !item?.cover || item.cover.trim() === ""
      ? placeholderImage
      : item.cover;
  return (
    <Link
      href={`/group?group=${item.id}`}
      className="cursor-pointer transition-all duration-300 p-2"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          boxShadow: "none",
          transition: "box-shadow 0.15s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0px 0px 4px 2px rgba(0,0,0,0.4), 0px 2px 8px 3px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="relative w-full aspect-square">
          <Image
            alt={item.name || "this image for groups"}
            className="object-cover w-full h-full"
            width={160}
            height={160}
            src={imageSrc}
            onError={() => setImgError(true)}
          />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-center">{item.name}</h3>
      </div>
    </Link>
  );
}
