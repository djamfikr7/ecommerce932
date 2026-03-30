"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allOrdersQuery } from "@/sanity/helpers/queries";
import PriceFormat from "@/components/PriceFormat";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await client.fetch(allOrdersQuery);
        setOrders(result || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const stats = [
    {
      title: "Total Revenue",
      value: <PriceFormat amount={totalRevenue} />,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Users,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <>
      <Header />
      <Container className="py-10">
        <Title className="mb-6">Admin Dashboard</Title>

        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Order #</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-right p-3">Total</th>
                    <th className="text-center p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr key={order._id} className="border-t">
                      <td className="p-3">{order.orderNumber?.slice(0, 12)}...</td>
                      <td className="p-3">{order.customerName}</td>
                      <td className="p-3 text-right">
                        <PriceFormat amount={order.totalPrice} />
                      </td>
                      <td className="p-3 text-center">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
