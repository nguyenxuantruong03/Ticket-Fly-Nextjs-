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
        className="flex items-center justify-center w-full"
      >
        <GoogleSVG />
      </Button>
    </Link>
  );
};

export default Social;
