"use client";
import { useRecommended } from "@/lib/api/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import { Categories, ProductFilters } from "@/types/Product";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RecommendedCategoriesCard = dynamic(
  () => import("./RecommendedCategoriesCard")
);
const RecommendedCategoriesSkeletonCard = dynamic(
  () => import("./RecommendedCategoriesSkeletonCard")
);
const Heading = dynamic(() => import("../common/Heading"));

interface FilterProps {
  onFilterChange?: (
    filterType: keyof ProductFilters,
    values: string[] | [number, number] | number | null
  ) => void;
}
export default function RecommendedCategoriesComponent({
  onFilterChange,
}: FilterProps) {
  const { data: recommendedCategories, isLoading } = useRecommended();
  const router = useRouter();
  const handleCategoryClick = (categoryId: number) => {
    if (onFilterChange) {
      onFilterChange("category", categoryId);
    } else {
      router.push(`/products?category=${categoryId}`);
    }
  };
  return (
    <section>
      <div>
        <Heading
          title={recommendedCategories?.recommendedCategories[0]?.sectionTitle}
        />
      </div>
      <div className="relative px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {isLoading ? (
              <RecommendedCategoriesSkeletonCard />
            ) : (
              recommendedCategories?.recommendedCategories?.map(
                (item: Categories) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-full px-3 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
                  >
                    <RecommendedCategoriesCard
                      item={item}
                      onClick={() =>
                        item.id !== undefined && handleCategoryClick(item.id)
                      }
                    />
                  </CarouselItem>
                )
              )
            )}
          </CarouselContent>
          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
      </div>
    </section>
  );
}
