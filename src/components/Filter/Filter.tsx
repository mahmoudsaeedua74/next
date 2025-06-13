"use client";
import React from "react";
import { Details, ProductFilters } from "@/types/Product";
import LoadingFilter from "./LoadingFilter";

import FilterComponent from "./FilterComponent";
import PriceFilter from "./PriceFilter";
import CombinedCategories from "./CombinedCategories";
interface Price {
    max: number;
    min: number;
}
interface Category {
    cover: string;
    id: number;
    name: string;
}
interface AllDate {
    details: Details;
    categories: Category[];
    main_categories: Category[];
    price_range: Price;
}
interface FilterProps {
    allData: AllDate;
    onFilterChange: (
        filterType: keyof ProductFilters,
        values: string[] | [number, number] | number | null
    ) => void;
    activeFilters: ProductFilters;
    isLoading?: boolean;
}

export default function Filter({
    allData,
    onFilterChange,
    activeFilters,
    isLoading,
}: FilterProps) {
    if (isLoading) {
        return <LoadingFilter />;
    }
    return (
        <div className="flex flex-col h-fit gap-y-4 text-sm bg-[#F6F7F8] py-4 px-5 font-semibold rounded-md">
            <CombinedCategories />
            <PriceFilter
                min={allData.price_range.min}
                max={allData.price_range.max}
                step={5}
                onPriceChange={(values) => {
                    onFilterChange("price_min", [
                        values.price_min,
                        values.price_min,
                    ]);
                    onFilterChange("price_max", [
                        values.price_max,
                        values.price_max,
                    ]);
                }}
                initialValues={[
                    allData.price_range.min,
                    allData.price_range.max,
                ]}
            />
            {Object.keys(allData?.details || {})?.map((key) => (
                <FilterComponent
                    key={key}
                    items={(allData?.details?.[key] || [])?.map(
                        (item: string) => ({
                            id: item,
                            name: String(item),
                        })
                    )}
                    onSelectionChange={(selected) =>
                        onFilterChange(`filter[${key}][]`, selected as string[])
                    }
                    initialSelected={
                        Array.isArray(activeFilters?.[`filter[${key}][]`])
                            ? (activeFilters?.[`filter[${key}][]`] as (
                                  | string
                                  | number
                              )[])
                            : []
                    }
                    title={key}
                    searchPlaceholder={`Search for a ${key.toLowerCase()}`}
                />
            ))}
        </div>
    );
}
