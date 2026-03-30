"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { client } from "@/sanity/lib/client";
import { searchProductsQuery } from "@/sanity/helpers/queries";
import { urlFor } from "@/sanity/lib/image-url";
import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { url: string } }[];
  intro?: string;
  price: number;
  discount?: number;
  stock?: number;
}

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const results = await client.fetch(searchProductsQuery, {
        searchParam: `${query}*`,
      });
      setProducts(results || []);
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchProducts]);

  return (
    <>
      <button
        onClick={() => setShowSearch(true)}
        className="hover:text-darkColor hoverEffect"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 relative">
                  <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
                    autoFocus
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    <span>Searching...</span>
                  </div>
                )}

                {!loading && search && products.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No products found for &quot;{search}&quot;
                  </p>
                )}

                {!loading && products.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50"
                      >
                        {product.images?.[0] && (
                          <Image
                            src={urlFor(product.images[0]).width(100).height(100).url()}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <Link
                            href={`/product/${product.slug.current}`}
                            onClick={() => setShowSearch(false)}
                          >
                            <h3 className="font-semibold hover:text-darkColor">
                              {product.name}
                            </h3>
                          </Link>
                          {product.intro && (
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.intro}
                            </p>
                          )}
                          <PriceView price={product.price} discount={product.discount} />
                          <div className="mt-2">
                            <AddToCartButton product={product as any} className="text-xs" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!search && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Search and explore your products</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
