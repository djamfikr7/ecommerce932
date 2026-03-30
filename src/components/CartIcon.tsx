"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCardStore } from "@/store";

const CartIcon = () => {
  const { items } = useCardStore();

  return (
    <Link href="/cart" className="relative group">
      <ShoppingBag className="w-5 h-5 hover:text-darkColor hoverEffect" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-darkColor text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
