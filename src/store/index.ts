"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { url: string } }[];
  intro?: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  status?: string;
  variant?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  receiptCard: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupItems: () => CartItem[];
}

export const useCardStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existingItem = get().items.find(
          (item) => item.product._id === product._id
        );
        if (existingItem) {
          return set({
            items: get().items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }
        return set({
          items: [...get().items, { product, quantity: 1 }],
        });
      },

      removeItem: (productId) => {
        set({
          items: get().items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        });
      },

      deleteProduct: (productId) => {
        set({
          items: get().items.filter(
            (item) => item.product._id !== productId
          ),
        });
      },

      receiptCard: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          return total + price * item.quantity;
        }, 0);
      },

      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = item.product.discount ?? 0;
          return total + (price + discount) * item.quantity;
        }, 0);
      },

      getItemCount: (productId) => {
        const item = get().items.find(
          (item) => item.product._id === productId
        );
        return item ? item.quantity : 0;
      },

      getGroupItems: () => get().items,
    }),
    { name: "cart-store" }
  )
);
