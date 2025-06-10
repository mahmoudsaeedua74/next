import { motion } from "framer-motion";
import React from "react";
const AnimatedHeading = ({ children }: { children: React.ReactNode }) => 
    (
    <motion.h2
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.h2>
);
export default AnimatedHeading;
