"use client";

import { motion } from "motion/react";
import { PackageX } from "lucide-react";

const NoProductsAvailable = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <PackageX className="w-16 h-16 text-gray-300 mb-4" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Products Available
      </h3>
      <p className="text-gray-500 max-w-md">
        We couldn&apos;t find any products in this category. Please check back
        later or explore our other collections.
      </p>
    </motion.div>
  );
};

export default NoProductsAvailable;
