"use client";
import useOutsideClick from "@/Hooks/useOutsideClick";
import { useGetAllProducts, useRecommended } from "@/lib/api/queries";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { Categories, Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/categories//photo.jpg";
export default function Search() {
    const [product, setProduct] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const { data: allData } = useGetAllProducts();
    const { data: recommendedCategories } = useRecommended();
    const suggestions = useMemo(() => {
        if (!product.trim() || !allData?.products?.data) return [];

        return allData?.products?.data
            .filter((item: Product) =>
                item.title.toLowerCase().includes(product.toLowerCase())
            )
            .slice(0, allData?.products?.data?.length);
    }, [product, allData?.products?.data]);

    const topRecommendations = useMemo(() => {
        if (!recommendedCategories?.recommendedCategories) return [];
        return recommendedCategories?.recommendedCategories.slice(-4);
    }, [recommendedCategories?.recommendedCategories]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (product.trim() !== "") {
            router.push(`/products?search=${encodeURIComponent(product)}`);
        } else {
            router.push(`/products`);
        }
        setIsOpen(false);
    };

    const ref = useOutsideClick({
        handler: () => setIsOpen(false),
    });

    return (
        <div ref={ref} className="relative flex-grow">
            <form className="w-full" onSubmit={handleSearchSubmit}>
                <div className="relative">
                    <input
                        type="search"
                        id="default-search"
                        className="search-input"
                        placeholder="Search for a product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                    />
                    <button type="submit" className="search-button bg-main ">
                        <svg
                            className="sm:w-5 h-3 w-3 sm:h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="w-full bg-white border rounded-md shadow-lg mt-1 absolute z-[55]">
                        {!product.trim() && topRecommendations.length > 0 ? (
                            <div className="p-3">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Recommended Categories
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {topRecommendations?.map(
                                        (category: Categories) => (
                                            <Link
                                                key={category.id}
                                                href={`/products?category=${category.id}`}
                                                className="p-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={
                                                            placeholderImage ||
                                                            "/fallback-image.jpg"
                                                        }
                                                        alt={
                                                            category.name ||
                                                            "category.name"
                                                        }
                                                        width={24}
                                                        height={24}
                                                        className="rounded-sm object-cover"
                                                    />

                                                    <span>{category.name}</span>
                                                </div>
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            suggestions.length > 0 && (
                                <ul className="max-h-64 overflow-y-auto py-1">
                                    {suggestions?.map((suggestion: Product) => (
                                        <Link
                                            key={suggestion.id}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer block"
                                            href={suggestion.link}
                                            target="_blank"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={suggestion.thumbnail}
                                                    alt={suggestion.title}
                                                    width={10}
                                                    height={10}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {suggestion.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {suggestion.final_price}{" "}
                                                        {suggestion.currency}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </ul>
                            )
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
