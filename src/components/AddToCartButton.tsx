"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCardStore, Product } from "@/store";
import PriceFormat from "./PriceFormat";
import QuantityButtons from "./QuantityButtons";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCardStore();
  const itemCount = getItemCount(product._id);

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Product added successfully");
  };

  if (itemCount > 0) {
    return (
      <div className="w-full space-y-2">
        <QuantityButtons product={product} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Subtotal:</span>
          <PriceFormat
            amount={product.price * itemCount}
            className="font-semibold"
          />
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
