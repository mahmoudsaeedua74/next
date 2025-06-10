import React from "react";
import { CarouselItem } from "../ui/carousel/carousel";

export default function RecommendedCategoriesSkeletonCard() {
    return Array(6)
        .fill(0)
        .map((_, index) => (
            <CarouselItem
                key={`skeleton-${index}`}
                className="basis-full sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
            >
                <div className="group cursor-pointer transition-all duration-300 p-2">
                    <div className="flex flex-col items-center rounded-[18px] p-3 bg-gray-50">
                        <div className="relative w-full aspect-square max-w-[180px] mb-3 overflow-hidden">
                            <div className="overflow-hidden rounded-full w-full h-full bg-gray-200 relative">
                                {/* Animated gradient overlay */}
                                <div className="absolute inset-0 skeleton-loading-animation"></div>
                            </div>
                        </div>
                        <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 skeleton-loading-animation"></div>
                        </div>
                    </div>
                </div>{" "}
            </CarouselItem>
        ));
}
