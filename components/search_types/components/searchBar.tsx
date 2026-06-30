"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TicketBusValue,
  ValidationError,
  TicketFlyValue,
  YachtValue,
} from "./types";

/* ======================
   VALUE TYPE
====================== */
type SearchRotateValue = TicketBusValue | TicketFlyValue | YachtValue;

/* ======================
   FIELD TYPES (2 MODE)
====================== */
type SingleField = {
  label: string;
  field: string;
  fields?: never;
};

type GroupField = {
  label: string;
  fields: string[];
  field?: never;
};

export type FieldConfig = SingleField | GroupField;

type ModeType =
  | "ticketFly"
  | "ticketBus"
  | "yacht"
  | "carRental"
  | "hotel"
  | "airporttransfer";

/* ======================
   PROPS
====================== */
type FeatureGridProps<T extends SearchRotateValue> = {
  fields: FieldConfig[];
  children: React.ReactNode;
  insertIndex?: number;
  setOpenDate?: (value: boolean) => void;
  value?: T;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  errorText: ValidationError[];

  mode: ModeType;
};

const FeatureGrid = <T extends SearchRotateValue>({
  fields,
  children,
  insertIndex = 0,
  setOpenDate,
  value,
  setValue,
  errorText,
  mode,
}: FeatureGridProps<T>) => {
  const pathname = usePathname();
  const [rotated, setRotated] = useState(false);

  const columns = fields.length;
  const leftPercent = ((insertIndex + 0.5) / columns) * 100;

  const childItems = React.Children.toArray(children);

  /* ======================
     NORMALIZE FIELD KEYS
  ====================== */
  const getKeys = (item: FieldConfig): string[] => {
    if ("fields" in item) return item.fields ?? []; // 🔥 FIX HERE
    return [item.field];
  };

  /* ======================
     ERROR MAPPING
  ====================== */
  const getFieldErrors = (item: FieldConfig) => {
    const keys = getKeys(item);
    return errorText?.filter((e) => keys.includes(e.field)) || [];
  };

  const toggleRotate = () => {
    setRotated((prev) => !prev);
    setValue?.((prev) => {
      return {
        ...prev,
        from: prev.to,
        to: prev.from,
      };
    });
  };

  /* ======================
     RENDER LABEL (checkbox special case)
  ====================== */
  const renderLabel = (item: FieldConfig) => {
    const keys = getKeys(item);

    const isCarRental = mode === "carRental";

    if (isCarRental) {
      return item.label;
    }

    // 🔥 CASE: DATE END => override label + checkbox
    if (keys.includes("dateEnd")) {
      return (
        <div className="flex items-center gap-2 mt-2 lg:mt-0">
          <Checkbox
            checked={value?.return_and_depart}
            onCheckedChange={(val) => {
              const next = val === true;

              setValue?.((prev) => ({
                ...prev,
                return_and_depart: next,
              }));

              if (!next) setOpenDate?.(false);
            }}
            className="
            bg-white
            data-[state=checked]:bg-custom-root
            data-[state=checked]:text-white
            h-5 w-5
          "
          />

          <span>Khứ hồi</span>
        </div>
      );
    }

    return item.label;
  };
  /* ======================
     SWAP BUTTON
  ====================== */
  const renderSwapButton = (mobile = false) => (
    <div
      onClick={toggleRotate}
      className={
        mobile
          ? `
            absolute top-[65%] left-[45%]
            -translate-y-1/2 z-10 
            flex lg:hidden
            items-center justify-center
            w-14 h-14 p-2
            bg-white border rounded-full cursor-pointer
          `
          : `
            hidden lg:flex
            absolute top-1/2
            -translate-x-1/2 -translate-y-1/2
            items-center justify-center
            w-10 h-10
            bg-white border-4 rounded-full cursor-pointer
          `
      }
      style={!mobile ? { left: `${leftPercent}%` } : undefined}
    >
      <RefreshCw
        className={`w-6 h-6 text-custom-root transition-transform ${
          rotated ? "rotate-180" : ""
        }`}
      />
    </div>
  );

  /* ======================
     RENDER
  ====================== */
  return (
    <div
      className={`${mode === "ticketFly" ? "mt-3" : ""} max-w-7xl w-full lg:mt-5 relative `}
    >
      {/* LABEL DESKTOP */}
      <div
        className={`
        hidden lg:grid mb-2 px-2 text-sm h-6
        ${pathname === "/" ? "text-white" : "text-black"}
      `}
        style={{
          gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
        }}
      >
        {fields.map((item, index) => (
          <div key={index}>{renderLabel(item)}</div>
        ))}
      </div>

      {/* GRID */}
      <div
        className="
        bg-white grid grid-cols-1
        lg:[grid-template-columns:var(--columns)]
        lg:rounded-2xl lg:shadow-sm lg:ring-4 lg:ring-gray-500
        items-center lg:divide-x relative lg:overflow-hidden
      "
        style={
          {
            "--columns": `repeat(${columns},minmax(0,1fr))`,
          } as React.CSSProperties
        }
      >
        {fields.map((item, index) => {
          const errors = getFieldErrors(item);
          const hasError = errors.length > 0;

          return (
            <React.Fragment key={index}>
              {/* MOBILE LABEL */}
              <div
                className={`
                lg:hidden px-1 text-sm mt-4
                ${pathname === "/" ? "text-black" : "text-black"}
              `}
              >
                {renderLabel(item)}
              </div>

              {/* INPUT */}
              <div className="px-1 lg:px-0">
                <div className="h-12 relative">
                  <Tooltip open={hasError}>
                    <TooltipTrigger asChild>
                      <div className="w-full h-full">{childItems[index]}</div>
                    </TooltipTrigger>

                    {hasError && (
                      <TooltipContent
                        side="bottom"
                        className="
                        text-white text-sm 
                        bg-black lg:bg-black/70 mt-2
                      "
                      >
                        {errors.map((e, i) => (
                          <div key={i}>{e.message}</div>
                        ))}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              </div>

              {/* MOBILE SWAP */}
              {insertIndex === index + 0.5 && renderSwapButton(true)}
            </React.Fragment>
          );
        })}

        {/* DESKTOP SWAP */}
        {insertIndex > 0 && renderSwapButton(false)}
      </div>
    </div>
  );
};

export default FeatureGrid;
