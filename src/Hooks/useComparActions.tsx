"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { useToast } from "../components/ui/Toast/use-toast";
import axios from "axios";
import Link from "next/link";
import {
  addToCompare,
  removeFromCompare,
} from "@/lib/store/slice/CompareSlice";
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const showCompareLink = (
  <Link
    href="/Compare"
    className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring"
  >
    View Compare
  </Link>
);
export default function useComparActions() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const compareItems = useAppSelector(
    (state) => state.compareSlice.compareItems
  );
  const isCompare = useAppSelector((state) => state.compareSlice.compareItems);
  const ids = isCompare.map((item) => item.id);
  const handleCompareClick = async (id: number) => {
    const alreadyInCompare = compareItems.some(
      (item) => item.id === Number(id)
    );
    if (alreadyInCompare) {
      toast({
        title: "Already in Compare",
        description: "This product is already in your Compare list.",
        variant: "destructive",
        action: showCompareLink,
      });
    } else {
      try {
        const response = await axios.get(`${BASEURL}/compare/${id}`);
        const productData = response.data?.data?.product;
        const stored = JSON.parse(localStorage.getItem("compareList") || "[]");
        localStorage.setItem(
          "compareList",
          JSON.stringify([...stored, productData])
        );

        dispatch(addToCompare(productData));
        toast({
          title: "Added to Compare",
          description: "Product has been added to your Compare list.",
          action: showCompareLink,
        });
      } catch {
        toast({
          title: "there is some error try again ",
          description: "Could not fetch product details.",
          variant: "destructive",
        });
      }
    }
  };
  const handleRemove = (productId: number) => {
    dispatch(removeFromCompare(productId));

    // Update localStorage
    const stored: { id: number }[] = JSON.parse(
      localStorage.getItem("compareList") || "[]"
    );
    const updatedCompare = stored.filter((item) => item.id !== productId);

    if (updatedCompare.length > 0) {
      localStorage.setItem("compareList", JSON.stringify(updatedCompare));
    } else {
      localStorage.removeItem("compareList");
    }

    toast({
      title: "Removed from Compare",
      description: "Product has been removed from your Compare list.",
    });
  };
  return { handleCompareClick, ids, handleRemove };
}
