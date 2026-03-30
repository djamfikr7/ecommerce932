import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Container className="py-12 max-w-3xl">
        <Title className="mb-6 text-3xl">Privacy Policy</Title>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
          <h3 className="text-lg font-semibold text-black">
            Information We Collect
          </h3>
          <p>
            We collect information you provide directly, such as your name,
            email address, and shipping address when you place an order.
          </p>
          <h3 className="text-lg font-semibold text-black">
            How We Use Your Information
          </h3>
          <p>
            We use your information to process orders, communicate with you,
            and improve our services.
          </p>
          <h3 className="text-lg font-semibold text-black">Data Security</h3>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
}
