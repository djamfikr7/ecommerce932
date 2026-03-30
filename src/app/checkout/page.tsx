"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import PriceFormat from "@/components/PriceFormat";
import { useCardStore } from "@/store";
import { useAuth } from "@/store/auth-context";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, getTotalPrice, receiptCard } = useCardStore();
  const { user, isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  if (!isSignedIn) {
    router.push("/cart");
    return null;
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      const orderData = {
        _type: "order",
        orderNumber,
        userId: user?.id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        products: items.map((item) => ({
          _type: "object",
          _key: `item_${item.product._id}`,
          product: {
            _type: "reference",
            _ref: item.product._id,
          },
          quantity: item.quantity,
        })),
        totalPrice: getTotalPrice(),
        currency: "USD",
        amountDiscount: 0,
        paymentMethod: "cod",
        status: "pending",
        orderDate: new Date().toISOString(),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to create order");

      receiptCard();
      router.push(`/success?order_number=${orderNumber}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="py-10">
        <Title className="mb-6">Checkout</Title>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shipping Address</label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor resize-none"
              />
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={loading}
            >
              {loading ? "Placing Order..." : `Place Order — $${getTotalPrice().toFixed(2)}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <PriceFormat amount={item.product.price * item.quantity} />
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <PriceFormat amount={getTotalPrice()} />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
