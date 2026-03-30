"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { headerData, socialLinks } from "@/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <motion.div
        ref={sidebarRef}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-72 bg-dark z-50 text-white p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <Logo className="text-white text-xl">Ecommerce932</Logo>
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {headerData.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-sm font-medium hover:text-gray-300 hoverEffect ${
                pathname === item.href ? "text-white" : "text-gray-400"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hoverEffect text-sm"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
