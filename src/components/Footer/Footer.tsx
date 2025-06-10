"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useFooter, useSocial, useThem } from "@/lib/api/queries";
import { Page, Social } from "@/types/footer";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.02,
            ease: "linear",
        },
    },
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
        },
    },
};
const leftVariant = {
    hidden: { x: -250, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
        },
    },
};
const rightVariant = {
    hidden: { x: 250, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
        },
    },
};
export default function Footer() {
    const { data } = useFooter();
    const { data: dataFooter } = useThem();
    const { data: social } = useSocial();
    const [dentMiss, usefulLink] = data || [];
    const footerRef = useRef(null);
    const bottomFooterRef = useRef(null);
    const footerInView = useInView(footerRef, {
        once: false,
        amount: 0.2,
    });
    const bottomFooterInView = useInView(bottomFooterRef, {
        once: false,
        amount: 0.2,
    });
    return (
        <>
            <footer className="bg-[#FEFAF4]  " ref={footerRef}>
                <div className="contain  py-8">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={footerInView ? "visible" : "hidden"}
                    >
                        {/* Column 1: Useful Links */}
                        <motion.div
                            className="footer-item"
                            variants={itemVariants}
                        >
                            <h6 className="text-lg font-semibold mb-4 text-[#121535]">
                                {usefulLink?.title}
                            </h6>
                            <ul className="space-y-3">
                                {usefulLink?.pages?.map((item: Page) => (
                                    <li key={item.id}>
                                        <Link
                                            href={`/${encodeURIComponent(item.title)}`}
                                            className="text-gray-600 cursor-pointer heroProduct-text transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 2: Don't Miss */}
                        <motion.div
                            className="footer-item"
                            variants={itemVariants}
                        >
                            <h6 className="text-lg font-semibold mb-4 text-[#121535]">
                                {dentMiss?.title}
                            </h6>
                            <ul className="space-y-3">
                                {dentMiss?.pages?.map((item: Page) => (
                                    <li key={item.id}>
                                        <Link
                                            href={`${
                                                item.title === "All Products"
                                                    ? "/products"
                                                    : ` /products?category=${item.id}`
                                            }          `}
                                            className="text-gray-600 cursor-pointer heroProduct-text transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 3: Social */}
                        <motion.div
                            className="footer-item"
                            variants={itemVariants}
                        >
                            <h6 className="text-lg font-semibold mb-4 text-[#121535]">
                                Social
                            </h6>
                            <p className="mb-4 text-gray-600">
                                {dataFooter?.website?.tagline}
                            </p>

                            <ul className="flex items-center gap-4">
                                {social?.map((item: Social) => (
                                    <li key={`social-${item.name}`}>
                                        <Link
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center  themed-text rounded-full  bg-icon transition-colors"
                                            aria-label={social.name}
                                        >
                                            {item.name === "Twitter" ? (
                                                <Twitter size={20} />
                                            ) : item.name === "Pinterest" ? (
                                                <FaPinterest size={20} />
                                            ) : null}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
                <div
                    className="bg-[#121535] py-4 overflow-hidden"
                    ref={bottomFooterRef}
                >
                    <div className="w-[85%] mx-auto">
                        <div className="flex justify-between items-center flex-wrap gap-4 py-2">
                            <motion.p
                                className="text-white text-sm"
                                variants={leftVariant}
                                initial="hidden"
                                animate={
                                    bottomFooterInView ? "visible" : "hidden"
                                }
                            >
                                {dataFooter?.website?.copyright}
                            </motion.p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <motion.span
                                    className="text-white text-sm"
                                    variants={rightVariant}
                                    initial="hidden"
                                    animate={
                                        bottomFooterInView
                                            ? "visible"
                                            : "hidden"
                                    }
                                >
                                    {dataFooter?.website?.policy}
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
