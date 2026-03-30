import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import FooterTop from "@/components/FooterTop";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Header />
      <HomeBanner />
      <Container>
        <ProductGrid />
      </Container>
      <div className="mt-10 bg-lightBg py-10">
        <Container className="text-center">
          <h2 className="text-2xl font-semibold">Free Shipping &amp; Secure Payment</h2>
          <p className="text-lightColor mt-2">Free shipping on orders over $120. Cash on Delivery available.</p>
        </Container>
      </div>
      <FooterTop />
      <Footer />
    </>
  );
}
