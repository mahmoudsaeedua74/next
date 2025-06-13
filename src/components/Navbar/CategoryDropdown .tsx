"use client";
import React, { useState, useCallback, memo } from "react";
import {
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { PiBomb } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { MainCategory } from "@/types/CategoryWithSubs";
import Link from "next/link";
import { useCategories } from "@/lib/api/queries";


const CategoryItem = memo(
  ({
    category,
    index,
    activeIndex,
    setActiveIndex,
  }: {
    category: MainCategory;
    index: number;
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
  }) => {
    const isActive = activeIndex === index;
    const hasMultipleSubcategories = category.categories && Object.keys(category.categories).length > 1;
    
    return (
      <li
        onMouseEnter={() => hasMultipleSubcategories && setActiveIndex(index)}
        onMouseLeave={() => hasMultipleSubcategories && setActiveIndex(null)}
        className="relative"
      >
        <div className="flex items-center justify-between px-4 py-2 hover:bg-[#F1F1F1] hover:font-bold cursor-pointer transition-colors duration-200">
          <div className="flex items-center gap-2">
            <PiBomb className="w-4 h-4 text-gray-500" />
            <Link
              href={`/category/${category.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {category.name}
            </Link>
          </div>
          {hasMultipleSubcategories && (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>

        <AnimatePresence>
          {isActive &&
            hasMultipleSubcategories && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-8 sm:top-0 left-1/4 sm:left-full w-64 bg-white border border-gray-200 rounded-md shadow-lg z-[999]"
              >
                <h4 className="px-4 py-2 font-semibold text-[#121535] text-lg mb-2">
                  {category.name}
                </h4>
                <ul className="space-y-2">
                  {Object.entries(category.categories)?.map(
                    ([subId, subName]) => (
                      <Link
                        href={`/category/${subName
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        key={subId}
                        className="px-4 py-2 group hover:bg-[#F1F1F1] flex items-center gap-2 hover:font-bold cursor-pointer transition-colors duration-150"
                      >
                        <span className="w-2 h-2 bg-[#b3b3b3] group-hover:bg-[#333333] rounded-full inline-block" />
                        <span>{subName}</span>
                      </Link>
                    )
                  )}
                </ul>
              </motion.div>
            )}
        </AnimatePresence>
      </li>
    );
  }
);
CategoryItem.displayName = "CategoryItem";

const CategoryDropdown = () => {
  const { data: mainCategories, isLoading, isError } = useCategories();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setActiveIndex(null);
  }, []);

  if (isLoading) {
    return (
      <div className="relative inline-block text-left z-50">
        <button className="flex items-center gap-2 p-4 lg:border-x">
          <LayoutGrid className="w-5 h-5" />
          <span>All Categories</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (isError || !mainCategories || mainCategories.length === 0) {
    return (
      <div className="relative inline-block text-left z-50">
        <button className="flex items-center gap-2 p-4 lg:border-x">
          <LayoutGrid className="w-5 h-5" />
          <span>All Categories</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    );
  }
  return (
    <div
      className="relative inline-block text-left z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-2 p-4 lg:border-x transition-colors duration-200 ${
          isHovered ? "themed-text bg-[#F1F1F1]" : ""
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span>All Categories</span>
        {isHovered ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-64 lg:w-72 py-1 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <ul className="space-y-1">
              {mainCategories?.map((category: MainCategory, index: number) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CategoryDropdown;
