"use client";

import { Button } from "@/components/ui/button";
import GoogleSVG from "@/public/google";
import Link from "next/link";

const Social = () => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`}
      className="w-full"
    >
      <Button
        variant="outline"
        size="icon"
        className="bg-white border w-full mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
      >
        <GoogleSVG />  Login with Google
      </Button>
    </Link>
  );
};

export default Social;
