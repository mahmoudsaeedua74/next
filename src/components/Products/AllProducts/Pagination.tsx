"use client";
import { Product } from "@/types/Product";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    lastPage: number;
    isLoading?: boolean;
    products: Product[];
}

export default function Pagination({
    currentPage,
    setCurrentPage,
    lastPage,
    isLoading = false,
    products = [],
}: PaginationProps) {
    // If there are no products and not loading, don't render anything
    if (products.length === 0 && !isLoading) return null;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Number of page buttons to show

        if (lastPage <= maxVisiblePages) {
            // If total pages are less than max visible, show all pages
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end of middle pages
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(lastPage - 1, currentPage + 1);

            // Adjust if we're near the start
            if (currentPage <= 3) {
                end = 4;
            }

            // Adjust if we're near the end
            if (currentPage >= lastPage - 2) {
                start = lastPage - 3;
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push("...");
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (end < lastPage - 1) {
                pages.push("...");
            }

            // Always show last page
            if (lastPage > 1) {
                pages.push(lastPage);
            }
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= lastPage && !isLoading) {
            setCurrentPage(page);
            // Scroll to top smoothly when changing page
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Loading skeleton that mimics the pagination component
    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 py-4 animate-pulse">
                <div className="p-2 rounded-md bg-gray-200 h-9 w-9"></div>
                <div className="px-4 py-2 rounded-md bg-gray-200 h-9 w-9"></div>
                <div className="px-4 py-2 rounded-md bg-gray-200 h-9 w-9"></div>
                <div className="px-4 py-2 rounded-md bg-gray-200 h-9 w-9"></div>
                <div className="p-2 rounded-md bg-gray-200 h-9 w-9"></div>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-center gap-2 py-4"
            aria-label="Pagination navigation"
        >
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`sm:p-2 rounded-md transition-colors ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                }`}
                aria-label="Previous page"
            >
                <FaChevronLeft size={20} />
            </button>

            {getPageNumbers()?.map((page, index) => (
                <button
                    key={index}
                    onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                    }
                    disabled={page === "..." || page === currentPage}
                    className={`p-2.5 sm:px-4 py-2 rounded-md transition-colors ${
                        page === currentPage
                            ? "bg-main text-white font-medium"
                            : page === "..."
                            ? "cursor-default text-gray-500"
                            : "hover:bg-gray-100 active:bg-gray-200"
                    }`}
                    aria-current={page === currentPage ? "page" : undefined}
                    aria-label={
                        typeof page === "number" ? `Page ${page}` : "More pages"
                    }
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`sm:p-2 rounded-md transition-colors ${
                    currentPage === lastPage
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                }`}
                aria-label="Next page"
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
}
