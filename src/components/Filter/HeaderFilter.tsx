"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { setLayout } from "@/lib/store/slice/gridSlice";
import { FaList } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import StarRating from "./Rate";
import { ProductFilters } from "@/types/Product";

interface HeaderFilterProps {
    totalProducts: number;
    onFilterChange: (
        filterType: keyof ProductFilters,
        values: string[] | [number, number]
    ) => void;
}
export default function HeaderFilter({
    totalProducts,
    onFilterChange,
}: HeaderFilterProps) {
    const dispatch = useAppDispatch();
    const layout = useAppSelector((state) => state.gridSlice.layout);
    const onLayoutChange = (newLayout: "grid" | "list") => {
        dispatch(setLayout(newLayout));
    };
    return (
        <>
            <div className=" px-2  border-b">
                <div className="flex justify-between items-center py-2 flex-wrap ">
                    <div className="flex justify-between items-center gap-4">
                        <h2 className="text-xl">Products</h2>
                        <p className="text-[#75757a]">
                            ({totalProducts} products found)
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div>
                            <StarRating
                                onRatingChange={(rating) =>
                                    onFilterChange(
                                        "rate",
                                        rating !== null
                                            ? [rating.toString()]
                                            : []
                                    )
                                }
                            />
                        </div>
                        <button
                            onClick={() => onLayoutChange("list")}
                            className={`p-2 rounded-md transition-colors ${
                                layout === "list"
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <FaList size={25} />
                        </button>
                        <button
                            onClick={() => onLayoutChange("grid")}
                            className={`p-2 rounded-md transition-colors ${
                                layout === "grid"
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <RiLayoutGridFill size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
