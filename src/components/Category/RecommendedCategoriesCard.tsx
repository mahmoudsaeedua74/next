"use client";
import Image from "next/image";
import { Categories } from "@/types/Product";
import React, { useState } from "react";
import placeholderImage from "../../../public/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg";

export default function RecommendedCategoriesCard({
  item,
  onClick,
}: {
  item: Categories;
  onClick?: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imageSrc =
    imgError || !item?.cover || item.cover.trim() === ""
      ? placeholderImage
      : item.cover;
  return (
    <div
      className="group cursor-pointer transition-all duration-300 p-2 heroProduct-text "
      onClick={onClick}
    >
      <div className="flex flex-col items-center rounded-[18px] p-3 bg-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.3),_0px_2px_8px_3px_rgba(0,0,0,0.15)]  sm:shadow-none sm:group-hover:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.3),_0px_2px_8px_3px_rgba(0,0,0,0.15)] transition-shadow duration-300">
        <div className="relative w-full aspect-square max-w-[180px] mb-3 ">
          <div className="overflow-hidden rounded-full w-full h-full">
            <Image
              alt={item.name || "Category Image"}
              className="object-cover w-full h-full"
              width={160}
              height={160}
              src={imageSrc}
              onError={() => setImgError(true)}
            />
          </div>
        </div>
        <h3 className="text-sm font-medium text-center transition-all duration-300 ">
          {item.name}
        </h3>
      </div>
    </div>
  );
}
