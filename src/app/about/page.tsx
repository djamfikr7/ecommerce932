import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";

export default function AboutPage() {
  return (
    <>
      <Header />
      <Container className="py-12 max-w-3xl">
        <Title className="mb-6 text-3xl">About Us</Title>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            Welcome to Ecommerce932 — your one-stop destination for premium
            fashion. We believe that everyone deserves access to high-quality,
            stylish clothing without breaking the bank.
          </p>
          <p>
            Founded in 2024, we&apos;ve been curating the best collection of
            t-shirts, jackets, pants, hoodies, and accessories for men, women,
            and kids.
          </p>
          <p>
            Our mission is to make fashion accessible, affordable, and
            enjoyable. Every product in our catalog is carefully selected to
            ensure the highest quality standards.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
}
