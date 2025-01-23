"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  iconRight?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label, iconRight }) => {
  return (
    <Button
      variant="link"
      className="flex items justify-start px-0 font-nomal w-full gap-0"
      size="sm"
      asChild
    >
      <Link href={href} className="hover:no-underline group ">
        <span className="flex group-hover:border-b-[1px] group-hover:border-slate-900 text-[#002D74]">
        {!iconRight && (
            <ArrowLeft className={`h-3 w-3 ${!iconRight && "mr-1"}`} />
        )}
          {label} 
        {iconRight && (
            <ArrowRight className={`h-3 w-3 ${iconRight && "ml-1"}`} />
        )}
        </span>
      </Link>
    </Button>
  );
};

export default BackButton;
