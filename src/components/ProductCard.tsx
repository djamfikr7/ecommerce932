import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image-url";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images?: { asset: { _ref: string } }[];
  intro?: string;
  price: number;
  discount?: number;
  stock?: number;
  status?: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group text-sm relative">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200">
        {product.images?.[0] && (
          <Link href={`/product/${product.slug.current}`}>
            <Image
              src={urlFor(product.images[0]).width(500).height(500).url()}
              alt={product.name}
              width={500}
              height={500}
              priority
              className={`w-full h-72 object-cover group-hover:scale-105 hoverEffect ${
                product.stock === 0 ? "opacity-50 group-hover:scale-100" : ""
              }`}
            />
          </Link>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-darkColor/50">
            <span className="text-white font-semibold text-lg">
              Out of Stock
            </span>
          </div>
        )}
        {product.status && product.stock !== 0 && (
          <span className="absolute top-2 left-2 bg-darkColor text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.status === "new"
              ? "New"
              : product.status === "hot"
              ? "Hot"
              : "Sale"}
          </span>
        )}
      </div>

      <div className="py-3 px-1">
        <Link href={`/product/${product.slug.current}`}>
          <h2 className="font-semibold line-clamp-1 group-hover:text-darkColor hoverEffect">
            {product.name}
          </h2>
        </Link>
        {product.intro && (
          <p className="text-sm text-lightColor line-clamp-1">
            {product.intro}
          </p>
        )}
        <PriceView
          price={product.price}
          discount={product.discount}
          className="mt-1"
        />
        <div className="mt-2">
          <AddToCartButton product={product as any} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
