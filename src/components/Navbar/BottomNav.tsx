"use client";
import Link from "next/link";
import CategoryDropdown from "./CategoryDropdown ";
import { useHeader } from "@/lib/api/queries";
import { Header } from "@/types/navbar";
export default function BottomNav() {
    const { data, isLoading } = useHeader();
    return (
        <div className="border">
            <div className="flex gap-12 items-center  contain">
                <div>
                    <CategoryDropdown />
                </div>
                <div>
                    <ul className="flex gap-6 text-[#0661e9] cursor-pointer">
                        {isLoading ? (
                            <>
                                <li>Wishlist</li>
                                <li>Compare</li>
                                <li>All Products</li>
                                <li>Home</li>
                            </>
                        ) : (
                            data?.map((item: Header) => (
                                <Link
                                    href={` ${
                                        item.title === "Home"
                                            ? "/"
                                            : item.title === "All Products"
                                            ? "/products"
                                            : `/${item.title}`
                                    }`}
                                    key={item.id}
                                >
                                    {item.title}
                                </Link>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
