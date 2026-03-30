import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";

export default function TermsPage() {
  return (
    <>
      <Header />
      <Container className="py-12 max-w-3xl">
        <Title className="mb-6 text-3xl">Terms &amp; Conditions</Title>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            By accessing and using Ecommerce932, you agree to be bound by these
            terms and conditions. Please read them carefully before making a
            purchase.
          </p>
          <h3 className="text-lg font-semibold text-black">1. General</h3>
          <p>
            These terms apply to all visitors, users, and others who access or
            use our service.
          </p>
          <h3 className="text-lg font-semibold text-black">2. Products</h3>
          <p>
            All products are subject to availability. We reserve the right to
            discontinue any product at any time.
          </p>
          <h3 className="text-lg font-semibold text-black">3. Pricing</h3>
          <p>
            Prices are subject to change without notice. We strive to display
            accurate pricing but errors may occur.
          </p>
          <h3 className="text-lg font-semibold text-black">
            4. Returns &amp; Refunds
          </h3>
          <p>
            We accept returns within 30 days of delivery. Items must be unworn
            with original tags attached.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
}
