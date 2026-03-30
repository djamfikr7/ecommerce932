"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { urlFor } from "@/sanity/lib/image-url";

interface Props {
  images?: { asset: { _ref: string } }[];
}

const ImageView = ({ images = [] }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-[450px] bg-gray-100 rounded-md flex items-center justify-center">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md overflow-hidden group"
        >
          <Image
            src={urlFor(images[activeIndex]).width(700).height(700).url()}
            alt="Product image"
            width={700}
            height={700}
            priority
            className="w-full h-full object-cover group-hover:scale-110 hoverEffect"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`border rounded-md overflow-hidden ${
                activeIndex === index ? "ring-1 ring-darkColor" : ""
              }`}
            >
              <Image
                src={urlFor(image).width(100).height(100).url()}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageView;
