"use client";

import { Button } from "@/components/ui/button";
import GoogleSVG from "@/public/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SocialProps {
  loading?: boolean;
}

const Social = ({ loading }: SocialProps) => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const googleLoginUrl = `${
    process.env.NEXT_PUBLIC_BACKEND_AUTH_GOOGLE
  }/google/login?redirect=${encodeURIComponent(redirect)}`;

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-white border w-full mt-5 text-sm hover:scale-105 duration-300 text-[#002D74]"
      disabled={loading}
    >
      <Link
        href={googleLoginUrl}
        className="flex justify-center items-center gap-x-3"
      >
        <GoogleSVG /> Login with Google
      </Link>
    </Button>
  );
};

export default Social;
