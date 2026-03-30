"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import PriceFormat from "@/components/PriceFormat";
import QuantityButtons from "@/components/QuantityButtons";
import EmptyCart from "@/components/EmptyCart";
import { useCardStore } from "@/store";
import { useAuth } from "@/store/auth-context";
import { urlFor } from "@/sanity/lib/image-url";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, deleteProduct, receiptCard, getTotalPrice, getSubTotalPrice } =
    useCardStore();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product removed");
  };

  const handleClearCart = () => {
    if (window.confirm("Clear all items from cart?")) {
      receiptCard();
      toast.success("Cart cleared");
    }
  };

  const handleCheckout = () => {
    if (!isSignedIn) {
      toast.error("Please sign in first");
      return;
    }
    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <Container className="py-10">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <Title className="mb-6">Shopping Cart</Title>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Products */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    {item.product.images?.[0] && (
                      <Link
                        href={`/product/${item.product.slug.current}`}
                        className="shrink-0"
                      >
                        <Image
                          src={urlFor(item.product.images[0]).width(120).height(120).url()}
                          alt={item.product.name}
                          width={120}
                          height={120}
                          className="rounded-md object-cover hover:scale-105 hoverEffect"
                        />
                      </Link>
                    )}

                    <div className="flex-1 space-y-2">
                      <Link
                        href={`/product/${item.product.slug.current}`}
                        className="font-semibold hover:text-darkColor hoverEffect"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.intro && (
                        <p className="text-sm text-gray-500">
                          {item.product.intro}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <PriceFormat
                          amount={item.product.price}
                          className="font-semibold"
                        />
                        {item.product.variant && (
                          <span className="text-xs text-gray-400">
                            | {item.product.variant}
                          </span>
                        )}
                      </div>
                      <QuantityButtons product={item.product as any} />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <PriceFormat
                        amount={item.product.price * item.quantity}
                        className="font-bold text-lg"
                      />
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:text-red-500 hoverEffect">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.product._id)}
                          className="p-1.5 hover:text-red-500 hoverEffect"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-darkColor hoverEffect"
                  >
                    &larr; Continue Shopping
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="text-sm"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="border rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceFormat amount={getSubTotalPrice()} />
                    </div>
                    {getSubTotalPrice() - getTotalPrice() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <PriceFormat
                          amount={-(getSubTotalPrice() - getTotalPrice())}
                        />
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <PriceFormat amount={getTotalPrice()} />
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-6"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Summary */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t p-4 z-30">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Total</span>
                <PriceFormat
                  amount={getTotalPrice()}
                  className="text-lg font-bold"
                />
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Container>
      <div className="pb-20 lg:pb-0" />
      <Footer />
    </>
  );
}
