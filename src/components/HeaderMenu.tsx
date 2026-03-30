"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerData } from "@/constants";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:inline-flex items-center gap-7">
      {headerData.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium hover:text-darkColor hoverEffect relative group ${
            pathname === item.href && "text-darkColor"
          }`}
        >
          {item.title}
          <span
            className={`absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-darkColor group-hover:w-1/2 hoverEffect ${
              pathname === item.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-0 w-0 h-[1.5px] bg-darkColor group-hover:w-1/2 hoverEffect ${
              pathname === item.href && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
};

export default HeaderMenu;
