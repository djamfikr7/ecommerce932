"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut, ListOrdered } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";
import { useAuth } from "@/store/auth-context";
import { useCardStore } from "@/store";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isSignedIn, signOut } = useAuth();
  const { items } = useCardStore();

  return (
    <header className="border-b border-gray-200">
      <Container className="flex items-center justify-between py-4">
        <Logo>Ecommerce932</Logo>
        <HeaderMenu />

        <div className="flex items-center gap-5">
          <SearchBar />
          <CartIcon />

          {isSignedIn ? (
            <>
              <Link
                href="/orders"
                className="relative hidden md:flex items-center gap-1 hover:text-darkColor hoverEffect"
              >
                <ListOrdered className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-darkColor text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Hi, {user?.name?.split(" ")[0]}
                </span>
                <button
                  onClick={signOut}
                  className="hover:text-darkColor hoverEffect"
                  aria-label="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const modal = document.getElementById("auth-modal");
                if (modal) modal.classList.remove("hidden");
              }}
              className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-darkColor hoverEffect"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}

          <MobileMenu onOpen={() => setSidebarOpen(true)} />
        </div>
      </Container>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
};

export default Header;
