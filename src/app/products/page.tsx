"use client";
import { useFilteredProducts, useGetAllProducts } from "@/lib/api/queries";
import { Categories, ProductFilters } from "@/types/Product";
import { usePathname } from "next/navigation";
import React, { Suspense, useCallback, useState } from "react";
import SearchParamsHandler from "./_SearchParamsHandler";
import dynamic from "next/dynamic";
import { FaFilter } from "react-icons/fa"; 
const RecommendedCategoriesComponent = dynamic(
  () => import("@/components/Category/RecommendedCategories")
);
const Filter = dynamic(() => import("@/components/Filter/Filter"));
const HeaderFilter = dynamic(() => import("@/components/Filter/HeaderFilter"));
const AllProducts = dynamic(
  () => import("@/components/Products/AllProducts/AllProducts")
);
const Pagination = dynamic(
  () => import("@/components/Products/AllProducts/Pagination")
);
const Breadcrumb = dynamic(
  () => import("@/components/ui/Breadcrumb/Breadcrumb")
);

export default function Page() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { data: allData, isLoading: isInitialLoading } =
    useGetAllProducts(currentPage);
  const { data: filteredData, isLoading: isFilterLoading } =
    useFilteredProducts(
      filters as Record<
        string,
        string | number | boolean | string[] | number[]
      >,
      currentPage
    );

  const isLoading = isInitialLoading || isFilterLoading;

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof ProductFilters];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

  const displayData = hasActiveFilters ? filteredData : allData;

  const handleFilterChange = (
    filterType: keyof ProductFilters | "reset",
    values?: string[] | [number, number] | number | null
  ) => {
    if (filterType === "reset") {
      setFilters({
        main_category: null,
        sub_category: null,
        price: null,
        rating: null,
        search: "",
      });
      return;
    }
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
  };

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const toggleMobileFilter = () => {
    setShowMobileFilter((prev) => !prev);
  };

  const selectedCategory = allData?.main_categories.filter(
    (category: Categories) => category?.id === filters?.main_category
  );

  const selectedSubCategories = allData?.categories.filter(
    (category: Categories) => category?.id === filters?.category
  );

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler setFilters={setFilters} />
      </Suspense>
      <Breadcrumb
        category={selectedCategory?.[0]?.name}
        subCategories={selectedSubCategories?.[0]?.name}
        pathname={pathname}
        onFilterChange={handleFilterChange}
      />
      <RecommendedCategoriesComponent onFilterChange={handleFilterChange} />
      <div className="md:hidden mb-4 mt-6">
        <button
          onClick={toggleMobileFilter}
          className="flex items-center justify-center gap-2 w-full py-2 heroProduct-text bg-gray-100 border border-gray-300 rounded-md transition hover:bg-gray-200"
        >
          <FaFilter />
          {showMobileFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      <div className="md:grid md:grid-cols-[1fr_3fr] gap-12 mt-4 md:mt-24">
        <div className={`${showMobileFilter ? "block" : "hidden"} md:block`}>
          <Filter
            allData={allData}
            onFilterChange={handleFilterChange}
            activeFilters={filters}
            isLoading={isInitialLoading}
          />
        </div>

        <div className="border border-black/10 rounded-md">
          <div>
            <HeaderFilter
              totalProducts={displayData?.products?.total || 0}
              onFilterChange={handleFilterChange}
            />
            <AllProducts
              products={displayData?.products.data || []}
              isLoading={isLoading}
              onFilterChange={handleFilterChange}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            lastPage={displayData?.products?.last_page || 1}
            isLoading={isLoading}
            products={displayData?.products.data}
          />
        </div>
      </div>
    </>
  );
}
