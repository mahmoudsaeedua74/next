import React from "react";

export default function HeroProductsSkeletonCard() {
    return Array(6)
        .fill(0)
        .map((_, index) => (
            <div
                className="rounded-xl overflow-hidden border w-full"
                key={`skeleton-${index}`}
            >
                <div className="w-full h-[180px] relative bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 right-to-left-loading"></div>
                </div>
                <div className="p-3 bg-white">
                    {/* Title placeholder */}
                    <div className="h-4 bg-gray-200 rounded w-full mb-1 relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>

                    {/* Rating placeholder */}
                    <div className="flex items-center mt-2">
                        <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                    </div>

                    {/* Price placeholder */}
                    <div className="mt-2">
                        <div className="h-5 w-20 bg-gray-200 rounded mb-1 relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 right-to-left-loading"></div>
                            </div>
                            <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 right-to-left-loading"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
}

