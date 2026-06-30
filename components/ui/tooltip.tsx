"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // ✅ quan trọng: remove overflow hidden (nó gây cảm giác lệch)
        "z-50 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-1",
        "data-[side=top]:slide-in-from-bottom-1",
        "data-[side=left]:slide-in-from-right-1",
        "data-[side=right]:slide-in-from-left-1",
        "origin-[--radix-tooltip-content-transform-origin]",
        className,
      )}
      {...props}
    >
      {children}

      {/* ✅ TRIANGLE FIX (KHÔNG LÀM GIÃN LAYOUT) */}
      <TooltipPrimitive.Arrow
        className="fill-primary absolute bottom-0 left-1/2 -translate-x-1/2 lg:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
        width={30}
        height={10}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
