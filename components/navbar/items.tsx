"use client";
import Link from "next/link";
import SignButton from "../auth/signButton";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navbar/nav_navigation";
import { LayoutGrid, Phone, X } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/users";
import { Session } from "@/lib/session";
interface UserProps {
  user: User;
  sessionData: Session | null;
}

const Navbar = ({ user, sessionData }: UserProps) => {
  const [openMenuNavMobile, setOpenMenuNavMobile] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-white p-5 border-b dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-slate-200">
      <div className="flex items-center justify-between space-x-2">
        {/* 1. Xử lý Logo riêng biệt */}
        <Link href="/">
          <Image
            src="/images/black-logo.png"
            alt="Logo"
            width={150}
            height={100}
            priority
          />
        </Link>

        {/* 2. Menu điều hướng */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Navigation */}
          <Navigation />

          {/* Contact */}
          <div className="flex items-center space-x-8">
            <Link
              href="tel:0352261103"
              className="font-semibold hidden lg:flex lg:items-center space-x-1"
            >
              <Phone className="w-4 h-4" fill="" />{" "}
              <span>Hotline: 0352261103</span>
            </Link>

            <Link
              href="/contact-us"
              className="bg-custom-root hover:bg-custom-darkroot hover:text-white font-semibold rounded-full p-2 text-sm"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="flex space-x-3 lg:space-x-0">
          {/*Login  */}
          <SignButton user={user} sessionData={sessionData}/>
          {/*Moblie: menu  */}
          <div className="lg:hidden">
            <Popover onOpenChange={setOpenMenuNavMobile}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  {openMenuNavMobile ? <X /> : <LayoutGrid />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-screen max-w-none mt-[19px]">
                <Navigation />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
