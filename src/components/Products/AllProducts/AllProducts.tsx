import { Product, ProductFilters } from "@/types/Product";
import RecommendedProductsSkeletonCard from "../RecommendedProduct/RecommendedProductsSkeletonCard";
import RecommendedProductsCard from "../RecommendedProduct/RecommendedProductsCard";
import EmptyProducts from "@/components/ui/Empty/EmptyProducts";
import { useAppSelector } from "@/lib/store/store";
interface AllProductsProps {
    products: Product[];
    isLoading: boolean;
    onFilterChange: (
        filterType: keyof ProductFilters | "reset",
        values?: string[] | [number, number] | number | null
    ) => void;
}

export default function AllProducts({
    products,
    isLoading,
    onFilterChange,
}: AllProductsProps) {
    const layout = useAppSelector((state) => state.gridSlice.layout);
    if (isLoading)
        return (
            <div className="grid text-start p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                <RecommendedProductsSkeletonCard />{" "}
            </div>
        );
    return (
        <>
            <div
                className={`
                    text-start p-4
                    ${
                        layout === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
                            : "grid grid-cols-1  min-[1180px]:grid-cols-2 gap-4"
                    }
                `}
            >
                {products?.map((product) => (
                    <RecommendedProductsCard
                        key={product.id}
                        item={product}
                        layout={layout}
                    />
                ))}
            </div>
            {products.length === 0 && (
                <EmptyProducts onFilterChange={onFilterChange} />
            )}
        </>
    );
}
