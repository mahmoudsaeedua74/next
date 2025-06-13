"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaAngleRight } from "react-icons/fa";
import { useCategories } from "@/lib/api/queries";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  cover?: string;
  categories?: Record<string, string>;
}

interface CombinedCategoriesProps {
  // onFilterChange: (filterType: string, value: number | null) => void;
  selectedMainCategory?: number | null;
  selectedSubCategory?: number | null;
}

export default function CombinedCategories({
  // onFilterChange,
  selectedMainCategory = null,
  selectedSubCategory = null,
}: CombinedCategoriesProps) {
  const { data: mainCategories, isLoading, isError } = useCategories();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMainCategories, setExpandedMainCategories] = useState<
    Record<number, boolean>
  >({});

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMainCategory = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMainCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const handleMainCategoryClick = (id: number) => {
  //   if (id === selectedMainCategory) {
  //     onFilterChange("main_category", null);
  //   } else {
  //     onFilterChange("main_category", id);
  //   }
  // };

  // const handleSubCategoryClick = (mainId: number, subId: number) => {
  //   if (subId === selectedSubCategory) {
  //     onFilterChange("category", null);
  //   } else {
  //     onFilterChange("category", subId);
  //   }
  //   if (selectedMainCategory !== mainId) {
  //     onFilterChange("main_category", mainId);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="border-b-2 pb-3 text-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-slate-900 font-medium">Categories</h3>
        </div>
        <div className="flex flex-col gap-2 mt-3 bg-white p-2">
          <div className="animate-pulse h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded w-4/5 mb-2"></div>
        </div>
      </div>
    );
  }

  if (isError || !mainCategories || mainCategories.length === 0) {
    return (
      <div className="border-b-2 pb-3 text-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-slate-900 font-medium">Categories</h3>
        </div>
        <div className="flex flex-col gap-2 mt-3 bg-white p-2">
          <div className="text-gray-500 italic">No categories available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b-2 pb-3 text-sm">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 transition-all duration-200"
        onClick={toggleExpand}
      >
        <h3 className="text-slate-900 font-bold">Categories</h3>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        className={`flex flex-col gap-2 mt-3 bg-white p-2 transition-all duration-100  overflow-hidden ${
          isExpanded ? "h-full opacity-100" : "h-0 opacity-0 p-0"
        }`}
      >
        {mainCategories?.map((mainCategory: Category) => (
          <div key={mainCategory.id} className="mb-2">
            <div className="flex items-center justify-between p-2 rounded-md transition-colors">
              <Link
                href={`/category/${mainCategory.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className={`text-sm cursor-pointer ${
                  selectedMainCategory === mainCategory.id
                    ? "themed-text"
                    : "hover:text-gray-700"
                }`}
                // onClick={() => handleMainCategoryClick(mainCategory.id)}
              >
                {mainCategory.name}
              </Link>

              {mainCategory.categories &&
                Object.keys(mainCategory.categories).length > 0 && (
                  <div
                    className="cursor-pointer p-1"
                    onClick={(e) => toggleMainCategory(mainCategory.id, e)}
                  >
                    <FaAngleRight
                      className={`transition-transform duration-100 ${
                        expandedMainCategories[mainCategory.id]
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </div>
                )}
            </div>
            {mainCategory.categories &&
              Object.keys(mainCategory.categories).length > 0 && (
                <div
                  className={`ml-4 mt-1 border-l-2 border-gray-200 pl-2 overflow-hidden transition-all duration-200  ${
                    expandedMainCategories[mainCategory.id]
                      ? "h-full opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {Object.entries(mainCategory.categories)?.map(
                    ([subId, subName]) => (
                      <div
                        key={subId}
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                          selectedSubCategory === parseInt(subId)
                            ? "themed-text"
                            : "hover:bg-gray-100"
                        }`}
                        // onClick={() =>
                        //   handleSubCategoryClick(
                        //     mainCategory.id,
                        //     parseInt(subId)
                        //   )
                        // }
                      >
                        <Link
                          href={`/category/${subName
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-sm"
                        >
                          {subName}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
