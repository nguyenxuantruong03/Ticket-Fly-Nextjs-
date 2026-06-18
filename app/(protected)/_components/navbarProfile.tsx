"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const NavbarProfile = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rouned-xl max-w-3xl w-full md:max-w-2xl shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href="/profile">Profile</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile/settings" ? "default" : "outline"}
        >
          <Link href="/profile/settings">Setting</Link>
        </Button>
      </div>
    </nav>
  );
};
