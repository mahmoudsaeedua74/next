import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types/Product";
import Badge from "../../ui/Badge/Badge";
import OfferBadge from "@/components/ui/Badge/OfferBadge";
import { useAppTheme } from "@/lib/context/Them";
import { memo } from "react";

const RecommendedCard = memo(({ item }: { item: Product }) => {
    const { mainColor } = useAppTheme();
    if (!item.final_price) {
        return null;
    }
    return (
        <Link
            href={item.link}
            target="_blank"
            className="rounded-xl relative overflow-hidden border hover:scale-105 hover:shadow-xl transition-all duration-200 w-full"
        >
            <div className="absolute -top-1 left-0 z-10">
                <Badge type={item.badge} />
            </div>
            <Image
                src={item.thumbnail}
                alt={item.title}
                width={150}
                height={150}
                className="object-contain h-[140px] w-[140px] mx-auto"
                priority={true}
                loading="eager"
                sizes="140px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
                quality={50}
            />
            <div className="p-3 bg-white">
                <h3 className="text-sm font-medium line-clamp-2 heroProduct-text transition-colors cursor-pointer">
                    {item.title}
                </h3>
                <div className="flex items-center mt-2">
                    <div className="flex items-center themed-text">
                        <span className="text-sm font-medium mr-1">
                            {item.rate ?? 0}
                        </span>
                        <Star size={16} fill={mainColor|| "hsl(35 84% 53%)"} />
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({item.rate ?? 0})
                    </span>
                </div>
                <div className="mt-2">
                    <div className="text-base font-semibold text-[#dc2626] flex items-center gap-1">
                        {item.final_price} {item.currency}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">
                            {item.price_before}
                            {item.currency}
                        </span>
                        {item.offer && <OfferBadge offer={item.offer} />}
                    </div>
                </div>
            </div>
        </Link>
    );
});
RecommendedCard.displayName = "RecommendedCard";

export default RecommendedCard;
