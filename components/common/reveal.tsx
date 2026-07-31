/** @format */

"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

type RevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
};

export default function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
