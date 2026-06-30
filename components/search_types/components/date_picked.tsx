"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

type SingleDate = {
  from: string;
  to?: never;
};

type SingleDateEnd = {
  from: string | null;
  to?: never;
};

type RangeDate = {
  from: string;
  to: string;
};

type DatePickedProps =
  | {
      type: "single";
      typeData?: "dateStart";
      date: SingleDate;
      setDate: (value: SingleDate) => void;
      checked?: boolean;
      setOpenDate?: (value: boolean) => void;
      openDate?: boolean;
      setChecked?: (value: boolean) => void;
    }
  | {
      type: "single";
      typeData: "dateEnd";
      date: SingleDateEnd;
      setDate: (value: SingleDateEnd) => void;
      checked?: boolean;
      setOpenDate?: (value: boolean) => void;
      openDate?: boolean;
      setChecked?: (value: boolean) => void;
    }
  | {
      type: "range";
      date: RangeDate;
      setDate: (value: RangeDate) => void;
      checked?: boolean;
      setOpenDate?: (value: boolean) => void;
      openDate?: boolean;
      setChecked?: (value: boolean) => void;
    };

const DatePicked = ({
  date,
  setDate,
  type,
  checked,
  setOpenDate,
  openDate,
  setChecked,
}: DatePickedProps) => {
  const [localOpen, setLocalOpen] = useState(false);
  const open = openDate ?? localOpen;
  const setOpen = setOpenDate ?? setLocalOpen;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const toDate = (d?: string | null) => (d ? new Date(d) : undefined);
  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (checked !== false) {
          setOpen(value);
        }
      }}
    >
      <PopoverTrigger asChild>
        <div
          className={`${checked === false ? "cursor-default" : "cursor-pointer"} border rounded-full p-3 lg:border-none lg:rounded-none flex items-center lg:p-1.5 w-full`}
          onClick={() => setChecked?.(true)}
        >
          <CalendarIcon
            className={`${checked !== false ? "text-custom-root" : "text-gray-400"} h-6 w-6 text-custom-root`}
          />
          <span className="justify-start px-2.5">
            {type === "range" ? (
              date?.from ? (
                date.to ? (
                  <>
                    {format(new Date(date.from), "LLL dd, y")} -{" "}
                    {format(new Date(date.to), "LLL dd, y")}
                  </>
                ) : (
                  format(new Date(date.from), "LLL dd, y")
                )
              ) : (
                "Pick date"
              )
            ) : date?.from ? (
              format(new Date(date.from), "LLL dd, y")
            ) : (
              "Select date"
            )}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        {type === "range" ? (
          <Calendar
            mode="range"
            disabled={{ before: today }}
            selected={{
              from: toDate(date.from),
              to: toDate(date.to),
            }}
            onSelect={(range) => {
              if (!range?.from || !range.to) return;

              setDate({
                from: format(range.from, "yyyy-MM-dd"),
                to: format(range.to, "yyyy-MM-dd"),
              });
            }}
            numberOfMonths={2}
          />
        ) : (
          <Calendar
            mode="single"
            disabled={checked === false || { before: today }}
            selected={toDate(date?.from)}
            onSelect={(d) => {
              if (!d) return;

              setDate({
                from: format(d, "yyyy-MM-dd"),
                to: undefined,
              });

              setOpen(false);
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicked;
