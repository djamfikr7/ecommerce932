import { cn } from "@/lib/utils";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormat = ({ amount, className }: Props) => {
  const formattedPrice = amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return <span className={cn(className)}>{formattedPrice}</span>;
};

export default PriceFormat;
