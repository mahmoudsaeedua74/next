"use client";
import { useSuggested } from "@/lib/api/queries";
import { setCompareItems } from "@/lib/store/slice/CompareSlice";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import dynamic from "next/dynamic";
const ProductsComparCard = dynamic(
  () => import("@/components/Compare/ProductsComparCard")
);
const Spinner = dynamic(() => import("@/components/ui/Loader"));
const Heading = dynamic(() => import("@/components/common/Heading"));
const RecommendedProductsCard = dynamic(
  () =>
    import("@/components/Products/RecommendedProduct/RecommendedProductsCard")
);
const EmptyCart = dynamic(() => import("@/components/common/EmptyCart"));
const detailKeys = [
  "Brand",
  "Color",
  "Condition",
  "Hardness",
  "ItemDimensions",
  "Manufacturer",
  "Material",
  "Point Type",
  "Size",
  "Surface Recommendation",
  "UnitCount",
];
const attributes = ["Product", "Name", "price", ...detailKeys, "Actions"];
export default function Page() {
  const dispatch = useAppDispatch();
  const compareItems = useAppSelector(
    (state) => state.compareSlice.compareItems
  );
  const { data } = useSuggested("compare");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compareList") || "[]");
    if (stored.length > 0) {
      dispatch(setCompareItems(stored));
    }
    setLoading(false);
  }, [dispatch]);
  useEffect(() => {
    if (compareItems.length === 0) {
      localStorage.removeItem("compareList");
    } else {
      localStorage.setItem("compareList", JSON.stringify(compareItems));
    }
  }, [compareItems]);

  if (loading) {
    return <Spinner />;
  }
  if (compareItems.length === 0) {
    return <EmptyCart title={" No results found... Please Back to Home ."} />;
  }
  //   const { details } = compareItems[1];
  //   ...Object.keys(details ?? {}),

  return (
    <div className=" py-8 ">
      <h1 className="text-2xl font-bold mb-6 ">
        Products Comparison ({compareItems.length})
      </h1>

      <div className="overflow-x-auto  px-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 ">
            <tr>
              {attributes?.map((detail, index) => (
                <th
                  key={index}
                  className="py-3 px-4 text-left font-medium text-gray-700"
                >
                  {detail}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareItems?.map((product: Product) => (
              <ProductsComparCard product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-12 ">
        <Heading
          title={"We Suggested This products for you"}
          className={"!text-start"}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data?.map((product: Product) => (
            <RecommendedProductsCard item={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
