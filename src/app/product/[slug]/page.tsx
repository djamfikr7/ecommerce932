import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ProductGrid from "@/components/ProductGrid";
import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/sanity/helpers/queries";
import { Heart, Box, MessageCircle, Truck, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <Container className="py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Images */}
          <div className="md:w-1/2">
            <ImageView images={product.images} />
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {product.name}
            </h1>

            <PriceView
              price={product.price}
              discount={product.discount}
              className="text-lg font-bold"
            />

            {(product.stock ?? 0) > 0 ? (
              <span className="inline-block bg-green-100 text-green-600 text-sm px-2.5 py-1 font-semibold rounded-lg">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="inline-block bg-red-100 text-red-600 text-sm px-2.5 py-1 font-semibold rounded-lg">
                Out of Stock
              </span>
            )}

            {product.description && (
              <p className="text-sm text-lightColor leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-3 lg:gap-5 w-full pt-2">
              <div className="flex-1">
                <AddToCartButton product={product} />
              </div>
              <button className="border border-darkColor/30 p-3 rounded-md hover:border-darkColor hover:text-darkColor hoverEffect">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4">
              <div className="flex items-center gap-1 hover:text-darkColor hoverEffect cursor-pointer">
                <Box className="w-4 h-4" />
                <span>Compare</span>
              </div>
              <div className="flex items-center gap-1 hover:text-darkColor hoverEffect cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>Ask a Question</span>
              </div>
              <div className="flex items-center gap-1 hover:text-darkColor hoverEffect cursor-pointer">
                <Truck className="w-4 h-4" />
                <span>Delivery &amp; Return</span>
              </div>
              <div className="flex items-center gap-1 hover:text-darkColor hoverEffect cursor-pointer">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="border rounded-lg p-3 hover:bg-gray-50 hoverEffect">
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $120</p>
              </div>
              <div className="border rounded-lg p-3 hover:bg-gray-50 hoverEffect">
                <p className="text-sm font-medium">Flexible Payment</p>
                <p className="text-xs text-gray-500">Cash on Delivery</p>
              </div>
            </div>

            <ProductCharacteristics product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            You May Also Like
          </h2>
          <ProductGrid />
        </div>
      </Container>
      <Footer />
    </>
  );
}
