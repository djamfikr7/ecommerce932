"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("order_number");

  if (!orderNumber) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Header />
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 bg-darkColor rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Order #{orderNumber}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• You will receive an order confirmation</li>
              <li>• We will prepare and pack your order</li>
              <li>• Payment is collected on delivery</li>
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:bg-gray-50 hoverEffect"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:bg-gray-50 hoverEffect"
            >
              <Package className="w-5 h-5" />
              <span className="text-xs">Orders</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:bg-gray-50 hoverEffect"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs">Shop</span>
            </Link>
          </div>
        </motion.div>
      </Container>
      <Footer />
    </>
  );
}
