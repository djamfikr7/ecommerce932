"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Header />
      <Container className="py-12 max-w-3xl">
        <Title className="mb-2 text-3xl">Contact Us</Title>
        <p className="text-gray-500 mb-6">
          We&apos;d love to hear from you. Fill out the form below and we&apos;ll
          get back to you soon.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkColor resize-none"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
}
