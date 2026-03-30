import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "./client-providers";

export const metadata: Metadata = {
  title: "Ecommerce932 — Premium Fashion Store",
  description:
    "Your one-stop destination for premium fashion. Quality clothing for men, women, and kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
