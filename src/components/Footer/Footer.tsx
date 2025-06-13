"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useFooter, useSocial, useThem } from "@/lib/api/queries";
import { Page, Social } from "@/types/footer";
import { useSocialIcon } from "./Render";
interface FooterPage {
  link: string;
  title: string;
  id: string;
}

interface ProcessedLink {
  href: string;
  isExternal: boolean;
}
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
  const { render } = useSocialIcon();
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

  const processLink = (item: FooterPage): ProcessedLink => {
    const { link, title } = item;
    if (link.includes("blog.findgreenery.com")) {
      return {
        href: link,
        isExternal: true,
      };
    }
    try {
      const url = new URL(link);
      const pathname = url.pathname;
      if (pathname.includes("/pages/")) {
        const slug = pathname.split("/pages/")[1];
        return {
          href: `/page/${slug}`,
          isExternal: false,
        };
      }
      return {
        href: `/${encodeURIComponent(title)}`,
        isExternal: false,
      };
    } catch {
      return {
        href: `/${encodeURIComponent(title)}`,
        isExternal: false,
      };
    }
  };
  return (
    <>
      <footer className="bg-nave" ref={footerRef}>
        <div className="contain  py-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={footerInView ? "visible" : "hidden"}
          >
            {/* Column 1: Useful Links */}
            <motion.div className="footer-item" variants={itemVariants}>
              <h6 className="text-lg font-semibold mb-4 text-[#121535]">
                {usefulLink?.title}
              </h6>
              <ul className="space-y-3">
                {usefulLink?.pages?.map((item: FooterPage) => {
                  const { href, isExternal } = processLink(item);

                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        className="text-gray-600 cursor-pointer heroProduct-text transition-colors"
                        {...(isExternal && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Column 2: Don't Miss */}
            <motion.div className="footer-item" variants={itemVariants}>
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
                          : ` /category/${item.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
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
            <motion.div className="footer-item" variants={itemVariants}>
              <h6 className="text-lg font-semibold mb-4 text-[#121535]">
                Social
              </h6>
              <p className="mb-4 text-gray-600">
                {dataFooter?.website?.tagline}
              </p>

              <ul className="flex items-center gap-4">
                {social?.map((item: Social) => (
                  <li key={`social-${item.name}`}>
                    {render(item.name, item.link)}
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
                animate={bottomFooterInView ? "visible" : "hidden"}
              >
                {dataFooter?.website?.copyright}
              </motion.p>
              <div className="flex items-center gap-2 flex-wrap">
                <motion.span
                  className="text-white text-sm"
                  variants={rightVariant}
                  initial="hidden"
                  animate={bottomFooterInView ? "visible" : "hidden"}
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
