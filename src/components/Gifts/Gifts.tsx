"use client";
import { useGroups } from "@/lib/api/queries";
import GiftCard from "./GiftCard";
import GiftSkeletonCard from "./GiftSkeletonCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel/carousel";
import { Groups } from "@/types/Product";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Heading = dynamic(
    () => import("../common/Heading")
);
const animate = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { amount: 0.2, once: false },
    transition: { duration: 0.5 },
};

export default function Gifts() {
    const { data: getGroups, isLoading } = useGroups();
        // sectionTitle === null the section will hide 
        if(getGroups?.length === 0|| getGroups?.getGroups[0]?.sectionTitle ===null){
            return;
        }
    return (
        <section>
            <motion.div {...animate}>
                <Heading title={"Gift Group"} />
                <div className="relative px-12 py-5">
                    {getGroups?.length <= 3 ? (
                        isLoading ? (
                            <div className="flex gap-2 justify-center items-center flex-wrap">
                                <GiftSkeletonCard />
                            </div>
                        ) : (
                            <div className="flex gap-2 justify-center items-center flex-wrap">
                                {getGroups?.map((item: Groups) => (
                                    <GiftCard key={item.id} item={item} />
                                ))}
                            </div>
                        )
                    ) : (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                skipSnaps: false,
                            }}
                        >
                            <CarouselContent>
                                {isLoading ? (
                                    <GiftSkeletonCard />
                                ) : (
                                    getGroups?.map((item: Groups) => (
                                        <CarouselItem
                                            className="basis-full sm:basis-1/3  md:basis-1/3 lg:basis-1/6"
                                            key={item.id}
                                        >
                                            <GiftCard item={item} />
                                        </CarouselItem>
                                    ))
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="-left-8" />
                            <CarouselNext className="-right-8" />
                        </Carousel>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
