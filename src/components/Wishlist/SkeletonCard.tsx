import React from "react";

export default function SkeletonCard() {
    return (
        <div className=" contain px-4 py-8 m-28">
            <div className=" rounded-xl h-[180px] relative bg-gray-200 ">
                <div className="absolute inset-0 right-to-left-loading"></div>
            </div>
        </div>
    );
}
