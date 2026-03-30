"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCardStore, Product } from "@/store";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const { addItem, removeItem, getItemCount } = useCardStore();
  const count = getItemCount(product._id);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className={cn("w-8 h-8", borderStyle)}
        onClick={() => removeItem(product._id)}
        disabled={count === 0}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="font-semibold text-sm w-8 text-center">{count}</span>
      <Button
        variant="outline"
        size="icon"
        className={cn("w-8 h-8", borderStyle)}
        onClick={() => addItem(product)}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantityButtons;
