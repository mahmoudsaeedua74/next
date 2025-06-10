"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ProductFilters } from "@/types/Product";

interface Props {
  setFilters: (filters: ProductFilters) => void;
}

export default function SearchParamsHandler({ setFilters }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const mainCategoryParam = searchParams.get("main_category");

    if (categoryParam) {
      setFilters({
        category: parseInt(categoryParam),
      });
    } else if (mainCategoryParam) {
      setFilters({
        main_category: parseInt(mainCategoryParam),
      });
    } else if (searchParam) {
      setFilters({
        search: searchParam,
      });
    } else {
      setFilters({
        main_category: null,
        sub_category: null,
        price: null,
        rating: null,
        search: "",
      });
    }
  }, [searchParams, setFilters]);

  return null;
}
