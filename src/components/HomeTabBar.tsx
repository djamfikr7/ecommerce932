"use client";

import { RotateCcw } from "lucide-react";
import { productType } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {productType.map((item) => (
        <button
          key={item.value}
          onClick={() => onTabSelect(item.title)}
          className={cn(
            "border border-darkColor px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect text-sm md:text-base",
            selectedTab === item.title && "bg-darkColor text-white"
          )}
        >
          {item.title}
        </button>
      ))}
      <button
        onClick={() => onTabSelect(productType[0].title)}
        className="border border-darkColor/50 p-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect"
        aria-label="Reset filter"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HomeTabBar;
