"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="relative mb-6"
      >
        <ShoppingBag className="w-24 h-24 text-gray-200" />
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          0
        </span>
      </motion.div>
      <h2 className="text-2xl font-semibold mb-2">
        Your cart is feeling lonely
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        It looks like you haven&apos;t added anything to your cart yet. Start
        shopping to discover amazing products!
      </p>
      <Link
        href="/"
        className="bg-darkColor text-white px-6 py-3 rounded-full font-semibold hover:bg-darkColor/90 hoverEffect"
      >
        Discover Products
      </Link>
    </div>
  );
};

export default EmptyCart;
