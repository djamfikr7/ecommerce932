"use client";

import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { quickLinksData, categoriesData } from "@/constants";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo>Ecommerce932</Logo>
            <p className="mt-4 text-sm text-gray-600">
              Your one-stop destination for premium fashion. Quality clothing
              for men, women, and kids at affordable prices.
            </p>
            <div className="mt-4">
              <SocialMedia
                className="text-darkColor/60"
                iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
                tooltipClassName="bg-darkColor text-white"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-darkColor font-medium hoverEffect"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-darkColor font-medium hoverEffect"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>

      <div className="border-t border-gray-200 py-4">
        <Container className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Ecommerce932. All rights reserved.
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
