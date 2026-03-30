"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import ProductCard from "@/components/ProductCard";
import NoProductsAvailable from "@/components/NoProductsAvailable";
import { client } from "@/sanity/lib/client";
import { allCategoriesQuery, productsByCategoryQuery, allProductsQuery } from "@/sanity/helpers/queries";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

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
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlug, setCurrentSlug] = useState(slug || "all");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await client.fetch(allCategoriesQuery);
        setCategories(result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (currentSlug === "all") {
        result = await client.fetch(allProductsQuery);
      } else {
        result = await client.fetch(productsByCategoryQuery, {
          categorySlug: currentSlug,
        });
      }
      setProducts(result || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentSlug]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header />
      <Container className="py-10">
        <Title className="mb-6">
          Products by Category — {currentSlug === "all" ? "All" : currentSlug}
        </Title>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-48 shrink-0">
            <h3 className="font-semibold mb-3 text-sm uppercase text-gray-500">
              Categories
            </h3>
            <div className="flex md:flex-col gap-2 flex-wrap">
              <button
                onClick={() => setCurrentSlug("all")}
                className={cn(
                  "text-left px-3 py-2 rounded-md text-sm hover:bg-darkColor hover:text-white hoverEffect",
                  currentSlug === "all"
                    ? "bg-darkColor text-white"
                    : "bg-transparent text-gray-700"
                )}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setCurrentSlug(cat.slug.current)}
                  className={cn(
                    "text-left px-3 py-2 rounded-md text-sm hover:bg-darkColor hover:text-white hoverEffect",
                    currentSlug === cat.slug.current
                      ? "bg-darkColor text-white"
                      : "bg-transparent text-gray-700"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-16"
                >
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  <span>Loading products...</span>
                </motion.div>
              ) : products.length > 0 ? (
                <motion.div
                  key={currentSlug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <NoProductsAvailable />
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
