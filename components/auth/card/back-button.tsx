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
    <Button variant="link" className="font-nomal w-full gap-0" size="sm" asChild>
      <Link
        href={href}
        className="flex items-center hover:no-underline group"
      >
        {!iconRight && (
          <span className="group-hover:border-b-[1px] group-hover:border-slate-900">
            <ArrowLeft className="h-3 w-3 " />
          </span>
        )}
        <span className="group-hover:border-b-[1px] group-hover:border-slate-900">
          {label}
        </span>
        {iconRight && (
          <span className="group-hover:border-b-[1px] group-hover:border-slate-900">
            <ArrowRight className="h-3 w-3 " />
          </span>
        )}
      </Link>
    </Button>
  );
};

export default BackButton;
