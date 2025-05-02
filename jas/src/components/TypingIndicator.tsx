"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-green-100"
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Leaf className="w-5 h-5 text-green-600" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl rounded-tl-none p-4 bg-green-50 border border-green-100 flex items-center"
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-green-400 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <span className="ml-2 text-green-600 text-sm font-medium">
          BloomBuddy is thinking...
        </span>
      </motion.div>
    </div>
  );
};

export default TypingIndicator;
