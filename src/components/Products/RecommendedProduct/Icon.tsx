import CompareClick from "@/components/Compare/CompareClick";
import Modal from "@/components/ui/Dialog/Modal";
import WishlistClick from "@/components/Wishlist/WishlistClick";
import { Product } from "@/types/Product";
import React from "react";

export default function Icon({ item }: { item: Product }) {
    return (
      <div className="absolute top-1 right-1 xs:top-2 xs:right-2 flex flex-col justify-center gap-1 xs:gap-2 z-10 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <WishlistClick item={item} />
        <CompareClick id={item.id ?? 0} />
        <Modal url={item.link} />
      </div>
    );
  }