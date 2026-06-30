"use client";

import { useState } from "react";
import NavigationNavHome from "./navigation_nav_home";
import SearchType from "@/components/search_types/search_type";
import { SearchTypeKey } from "@/components/search_types/item";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeType, setActiveType] = useState<SearchTypeKey>("hotel");

  const handleClickOption = (type: SearchTypeKey) => {
    setActiveType(type);
  };

  return (
    <div className="relative ">
      <div
        className="
        absolute
        top-1/3
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        z-50
        w-full
        hidden lg:block
        "
      >
        <h1 className="text-3xl text-white text-center font-bold mb-5">
          App du lịch hàng đầu, một chạm đi bất cứ đâu
        </h1>
        <NavigationNavHome
          onSelect={handleClickOption}
          activeType={activeType}
        />

        <SearchType type={activeType} isHome key={activeType}/>
      </div>

      {children}
    </div>
  );
}
