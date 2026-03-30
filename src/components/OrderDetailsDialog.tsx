"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image-url";
import PriceFormat from "./PriceFormat";
import { Button } from "@/components/ui/button";

interface OrderProduct {
  quantity: number;
  product?: {
    _id: string;
    name: string;
    images?: { asset: { _ref: string } }[];
    price: number;
  };
}

interface Order {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: string;
  totalPrice: number;
  amountDiscount?: number;
  paymentMethod?: string;
  customerAddress?: string;
  products: OrderProduct[];
}

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog = ({ order, isOpen, onClose }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details — #{order.orderNumber?.slice(0, 8)}...</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Customer:</span>{" "}
              {order.customerName}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {order.customerEmail}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span className="capitalize text-green-600">{order.status}</span>
            </div>
            <div>
              <span className="font-semibold">Payment:</span>{" "}
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
            </div>
            {order.customerAddress && (
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {order.customerAddress}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Products</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Product</th>
                    <th className="text-center p-3">Qty</th>
                    <th className="text-right p-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products?.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 flex items-center gap-2">
                        {item.product?.images?.[0] && (
                          <Image
                            src={urlFor(item.product.images[0]).width(40).height(40).url()}
                            alt={item.product.name || "Product"}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                        )}
                        <span className="line-clamp-1">
                          {item.product?.name || "Unknown"}
                        </span>
                      </td>
                      <td className="text-center p-3">{item.quantity}</td>
                      <td className="text-right p-3">
                        <PriceFormat
                          amount={(item.product?.price || 0) * item.quantity}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-4 flex flex-col items-end gap-1 text-sm">
            {order.amountDiscount && order.amountDiscount > 0 && (
              <div className="flex gap-4">
                <span className="font-semibold">Discount:</span>
                <PriceFormat amount={order.amountDiscount} />
              </div>
            )}
            <div className="flex gap-4 text-lg font-bold">
              <span>Total:</span>
              <PriceFormat amount={order.totalPrice} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
