import React from "react";

export default function RecommendedProductsSkeletonCard() {
    return Array.from({ length: 12 }).map((_, i) => (
        <div key={`skeleton-${i}`} className="col-span-1">
            <div className="rounded-xl w-full group relative">
                {/* Badge placeholder */}
                <div className="absolute top-2 left-2">
                    <div className="h-6 w-12 bg-gray-200 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>
                </div>

                {/* Image placeholder */}
                <div className="w-full aspect-square bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 right-to-left-loading"></div>
                </div>

                {/* Product info placeholders */}
                <div className="p-3">
                    {/* Title placeholder */}
                    <div className="h-4 bg-gray-200 rounded w-full mb-1 relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>

                    {/* Rating placeholder */}
                    <div className="flex items-center mt-2">
                        <div className="h-4 w-20 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                    </div>

                    {/* Price placeholder */}
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <div className="h-5 w-16 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                        <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 right-to-left-loading"></div>
                        </div>
                    </div>

                    {/* Button placeholder */}
                    <div className="mt-2 h-9 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 right-to-left-loading"></div>
                    </div>
                </div>
            </div>
        </div>
    ));
}
