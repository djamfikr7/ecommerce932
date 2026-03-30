import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsData } from "@/constants";

export default function FAQPage() {
  return (
    <>
      <Header />
      <Container className="py-12 max-w-3xl">
        <Title className="mb-6 text-3xl">Frequently Asked Questions</Title>
        <Accordion type="single" collapsible defaultValue="item-0">
          {faqsData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-darkColor/80 hover:text-darkColor">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <Footer />
    </>
  );
}
