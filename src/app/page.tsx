import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/ui/ScrollToTop/ScrollToTopButton";
const HeroProducts = dynamic(
    () => import("@/components/Products/HeroProduct/HeroProducts")
);
const RecommendedCategoriesComponent = dynamic(
    () => import("@/components/Category/RecommendedCategories")
);
const Gifts = dynamic(() => import("@/components/Gifts/Gifts"));
const RecommendedProducts = dynamic(
    () => import("@/components/Products/RecommendedProduct/RecommendedProducts")
);
export default function Home() {
    return (
        <div className="space-y-8">
            <HeroProducts />
            <RecommendedCategoriesComponent />
            <Gifts />
            <RecommendedProducts />
            <ScrollToTopButton />
        </div>
    );
}
