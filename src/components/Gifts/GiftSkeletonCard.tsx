import React from "react";
import { CarouselItem } from "../ui/carousel/carousel";

export default function GiftSkeletonCard() {
    return Array(6)
        .fill(0)
        .map((_, index) => (
            <CarouselItem
                key={`skeleton-${index}`}
                className="basis-full sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
            >
                <div
                    className="cursor-pointer transition-all duration-300 p-2"
                    key={`skeleton-${index}`}
                >
                    <div className="rounded-xl overflow-hidden">
                        {/* Image placeholder */}
                        <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                    </div>
                    <div className="mt-2">
                        {/* Title placeholder */}
                        <div className="h-4 bg-gray-200 w-3/4 mx-auto rounded relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                    </div>
                </div>
            </CarouselItem>
        ));
}
