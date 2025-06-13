import { ProductFilters } from "@/types/Product";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface Slug {
    category: string;
    subCategories: string;
    pathname: string;
    onFilterChange: (
        filterType: keyof ProductFilters,
        values: string[] | [number, number] | number | null
    ) => void;
}

export default function Breadcrumb({
    category,
    subCategories,
    pathname,
    onFilterChange,
}: Slug) {
    const formattedPathname = pathname ==="category"? pathname:pathname.substring(1);
    const result =
        formattedPathname.charAt(0).toUpperCase() + formattedPathname.slice(1);
    const handleResetFilters = () => {
        onFilterChange("main_category", null);
        onFilterChange("category", null);
    };

    return (
        <nav className="bg-nave py-3 px-4 rounded-lg my-6 flex justify-center items-center gap-2 font-medium">
            <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
            >
                Home
            </Link>

            {result && (
                <>
                    <IoIosArrowForward className="text-gray-500" />
                    <Link
                        onClick={() => handleResetFilters()}
                        href={pathname==="category"?"/products": pathname}
                        className={`${
                            !category && !subCategories
                                ? "themed-text"
                                : "text-gray-600 hover:text-gray-900 transition-colors"
                        }`}
                    >
                        {result}
                    </Link>
                </>
            )}

            {category && (
                <>
                    <IoIosArrowForward className="text-gray-500" />
                    <span
                        className={`${
                            category && !subCategories
                                ? "text-themed-text"
                                : "text-gray-600 hover:text-gray-900 transition-colors"
                        }`}
                    >
                        {category}
                    </span>
                </>
            )}

            {subCategories && (
                <>
                    <IoIosArrowForward className="text-gray-500" />
                    <span className="text-themed-text">{subCategories}</span>
                </>
            )}
        </nav>
    );
}
