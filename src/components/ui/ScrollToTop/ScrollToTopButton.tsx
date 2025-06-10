"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useAppTheme } from "@/lib/context/Them";
export default function ScrollToTopButton() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const { mainColor } = useAppTheme();
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
        setIsVisible(scrollTop > 100);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Calculate the circumference of the circle
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - scrollProgress / 100);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-5 right-5 z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        onClick={scrollToTop}
                        className="relative w-12 h-12 rounded-full bg-white shadow-lg cursor-pointer flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Circle background and progress indicator */}
                        <svg
                            className="absolute -rotate-90  top-0 left-0 w-full h-full"
                            viewBox="0 0 56 56"
                        >
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                stroke="#e5e7eb"
                                strokeWidth="4"
                                fill="none"
                            />
                            <motion.circle
                                cx="28"
                                cy="28"
                                r={radius}
                                stroke={mainColor}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: dashOffset }}
                                transition={{ duration: 0.1 }}
                            />
                        </svg>

                        {/* Arrow icon */}
                        <ArrowUp className="w-6 h-6 themed-text] z-10" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
