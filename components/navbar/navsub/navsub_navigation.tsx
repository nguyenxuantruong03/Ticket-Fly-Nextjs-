"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAVSUB_ITEMS, NAVSUBDROPDOWNMORE_ITEMS } from "./items";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavigationSub = () => {
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";

  const isScroll1 = isHome && scrollY > 1;

  const bgClass = isHome
    ? isScroll1
      ? "bg-white"
      : "bg-transparent"
    : "bg-white";

  const textHome = isHome && !isScroll1 ? "text-slate-300" : "text-slate-500";

  return (
    <nav
      className={`${bgClass} px-8 z-50 w-full p-1 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-slate-200`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {NAVSUB_ITEMS.filter((item) => item.isShow === true).map((item) => {
            const isActive =
              isHome && !isScroll1
                ? "text-slate-300"
                : pathname === item.link
                  ? "text-custom-root"
                  : "text-slate-500";
            return (
              <div key={item.link}>
                <BreadcrumbItem>
                    <Link
                      className={`hover:text-custom-darkroot ${isActive}`}
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                </BreadcrumbItem>
              </div>
            );
          })}

          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <BreadcrumbEllipsis className={`${textHome}`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  {NAVSUBDROPDOWNMORE_ITEMS.map((item) => {
                    const isActive =
                      pathname === item.link
                        ? "text-custom-root"
                        : "text-slate-500";
                    return (
                      <li key={item.link}>
                        <DropdownMenuItem>
                          <Link
                            className={`${isActive} hover:text-custom-darkroot`}
                            href={item.link}
                          >
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      </li>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default NavigationSub;
