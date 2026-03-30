"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  product: {
    stock?: number;
    intro?: string;
    variant?: string;
  };
}

const ProductCharacteristics = ({ product }: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="characteristics">
        <AccordionTrigger className="text-left text-base font-semibold">
          Product Characteristics
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-gray-200 py-5">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-black">Brand:</span> Toulouse
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-black">Collection:</span> 2024
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-black">Stock:</span>{" "}
              {(product.stock ?? 0) > 0 ? "Available" : "Out of Stock"}
            </p>
            {product.variant && (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Variant:</span>{" "}
                {product.variant}
              </p>
            )}
            {product.intro && (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Details:</span>{" "}
                {product.intro}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
