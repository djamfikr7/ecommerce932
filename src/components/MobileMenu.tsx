"use client";

import { Menu } from "lucide-react";

interface Props {
  onOpen: () => void;
}

const MobileMenu = ({ onOpen }: Props) => {
  return (
    <button
      onClick={onOpen}
      className="md:hidden hover:text-darkColor hoverEffect"
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
};

export default MobileMenu;
