"use client";
import useOutsideClick from "@/Hooks/useOutsideClick";
import React, { useState } from "react";
import { FaStar, FaRegStar, FaChevronDown } from "react-icons/fa";

interface StarRatingProps {
    onRatingChange?: (rating: number | null) => void;
}

export default function StarRating({ onRatingChange }: StarRatingProps) {
    const ratings = [5, 4, 3, 2, 1];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const ref = useOutsideClick({ handler: () => setIsOpen(false) });

    const handleRatingClick = (rating: number) => {
        // Toggle rating if clicking the same rating again
        if (selectedRating === rating) {
            setSelectedRating(null);
            if (onRatingChange) {
                onRatingChange(null);
            }
        } else {
            setSelectedRating(rating);
            if (onRatingChange) {
                onRatingChange(rating);
            }
        }
        setIsOpen(false);
    };

    return (
        <div className="relative w-fit" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-fit text-sm p-2 gap-2  border rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="font-medium">Rating</span>
                    {selectedRating && (
                        <div className="flex ml-1">
                            {[...Array(5)]?.map((_, index) => (
                                <span key={index} className="text-yellow-400">
                                    {index < selectedRating ? (
                                        <FaStar size={12} />
                                    ) : (
                                        <FaRegStar size={12} />
                                    )}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <FaChevronDown
                    className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-10 z-10 w-fit bg-white border rounded-md shadow-lg">
                    <div className="flex flex-col py-1">
                        {ratings?.map((rating) => (
                            <button
                                key={rating}
                                onClick={() => handleRatingClick(rating)}
                                className={`flex items-center gap-x-2 p-3 transition-colors ${
                                    selectedRating === rating
                                        ? "bg-blue-50 hover:bg-blue-100"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <div className="flex">
                                    {[...Array(5)]?.map((_, index) => (
                                        <span
                                            key={index}
                                            className="text-yellow-400"
                                        >
                                            {index < rating ? (
                                                <FaStar size={16} />
                                            ) : (
                                                <FaRegStar size={16} />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
