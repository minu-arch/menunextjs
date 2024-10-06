"use client";

import { motion } from "framer-motion";

export default function Component() {
  return (
    <div className="flex size-full items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-3 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}
