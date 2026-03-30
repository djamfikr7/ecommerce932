import { cn } from "@/lib/utils";
import PriceFormat from "./PriceFormat";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PriceFormat amount={price} className="text-black font-semibold" />
      {discount && discount > 0 && (
        <PriceFormat
          amount={price! + discount}
          className="line-through text-gray-500 text-sm"
        />
      )}
    </div>
  );
};

export default PriceView;
