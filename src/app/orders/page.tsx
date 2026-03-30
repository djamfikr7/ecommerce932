"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileX } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import PriceFormat from "@/components/PriceFormat";
import OrderDetailsDialog from "@/components/OrderDetailsDialog";
import { useAuth } from "@/store/auth-context";
import { client } from "@/sanity/lib/client";
import { ordersByUserQuery } from "@/sanity/helpers/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderProduct {
  quantity: number;
  product?: { _id: string; name: string; images?: any[]; price: number };
}

interface Order {
  _id: string;
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

export default function OrdersPage() {
  const { user, isSignedIn } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const result = await client.fetch(ordersByUserQuery, {
          userId: user?.id,
        });
        setOrders(result || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user?.id, router]);

  return (
    <>
      <Header />
      <Container className="py-10">
        {loading ? (
          <div className="text-center py-16">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileX className="w-12 h-12 text-gray-400 mb-4" />
            <Title>No Orders Found</Title>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              It looks like you haven&apos;t placed any orders yet. Start
              shopping to see your orders here!
            </p>
            <Link href="/">
              <Button className="mt-6">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <>
            <Title className="mb-6">My Orders</Title>
            <ScrollArea className="w-full">
              <TooltipProvider>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <Tooltip key={order._id}>
                        <TooltipTrigger asChild>
                          <TableRow
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <TableCell className="font-medium">
                              {order.orderNumber?.slice(0, 10)}...
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.customerEmail}
                            </TableCell>
                            <TableCell>
                              <PriceFormat amount={order.totalPrice} />
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        </TooltipTrigger>
                        <TooltipContent>
                          Click to see order details
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TableBody>
                </Table>
              </TooltipProvider>
            </ScrollArea>
          </>
        )}
      </Container>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <Footer />
    </>
  );
}
