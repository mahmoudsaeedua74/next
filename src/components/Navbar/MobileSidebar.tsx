"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown ";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logoTow from "@/assets/logo/1743182423TOOLLISTING_logo.png";
import { useHeader, useThem } from "@/lib/api/queries";
import { Header, NavbarProps } from "@/types/navbar";
export default function MobileSidebar({ isOpen, setIsOpen }: NavbarProps) {
  const { data } = useHeader();
  const { data: logo } = useThem();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[300px] bg-white z-[61] shadow-xl "
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Image
                alt="Logo"
                src={logo?.website?.logo || logoTow}
                className="object-cover"
                width={150}
                height={75}
                priority
                loading="eager"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-4 text-[#0661e9] font-medium">
                {data?.map((item: Header) => (
                  <li key={item.id}>
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
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="mobile-categories">
                <div className="mobile-category-wrapper">
                  <CategoryDropdown />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
