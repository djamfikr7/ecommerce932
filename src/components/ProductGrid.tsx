"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { productsByVariantQuery } from "@/sanity/helpers/queries";
import HomeTabBar from "./HomeTabBar";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { productType } from "@/constants";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { _ref: string } }[];
  intro?: string;
  price: number;
  discount?: number;
  stock?: number;
  status?: string;
  variant?: string;
}

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0].title);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.fetch(productsByVariantQuery, {
        variant: selectedTab.toLowerCase(),
      });
      setProducts(result || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div id="products" className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Our Products
        </h2>
        <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-16"
          >
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading products...</span>
          </motion.div>
        ) : products.length > 0 ? (
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <NoProductsAvailable />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
