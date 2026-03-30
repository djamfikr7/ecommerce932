"use client";

import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import Logo from "./Logo";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 min-h-screen w-full bg-white flex flex-col items-center justify-center z-50 gap-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Logo>Ecommerce932</Logo>
      </motion.div>
      <div className="flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className="text-sm text-gray-600 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
