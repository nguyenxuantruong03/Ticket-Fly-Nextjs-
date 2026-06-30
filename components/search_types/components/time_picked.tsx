"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";

interface TimePickedProps {
  description?: string;
  minuteType?: "step" | "full" | "half";
  value: string;

  setValue: (value: string) => void;
}

const TimePicked = ({
  description,
  minuteType = "step",
  value,
  setValue,
}: TimePickedProps) => {
  const [open, setOpen] = useState(false);

  const [hour, minute] = (value ?? "09:00").split(":");

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const minutes =
    minuteType === "step"
      ? Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"))
      : minuteType === "half"
        ? ["00", "30"]
        : Array.from({ length: 59 }, (_, i) => String(i + 1).padStart(2, "0"));

  const time = `${hour}:${minute}`;

  const updateTime = (h: string, m: string) => {
    const newTime = `${h}:${m}`;

    setValue(newTime);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative">
          <Clock className="h-6 w-6 absolute left-3 top-2 text-custom-root" />
          <Input
            readOnly
            value={time}
            onClick={() => setOpen(true)}
            className="pl-12 mt-0.5 !text-lg shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none"
          />
        </div>
      </PopoverAnchor>

      <PopoverContent className="w-[260px] rounded-none p-0" align="end">
        {description && (
          <div className="bg-gray-200 p-2 text-sm text-gray-700">
            {description}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 p-2">
          {/* Hour */}
          <Command>
            <Label className="p-2 font-semibold">Giờ</Label>

            <CommandList className="h-60 border rounded-md">
              {hours.map((h) => (
                <CommandItem
                  key={h}
                  onSelect={() => {
                    updateTime(h, minute);
                  }}
                  className={`${hour === h && "bg-gray-100"} cursor-pointer data-[selected=true]:bg-transparent
    data-[highlighted]:bg-transparent`}
                >
                  {h === hour && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                  )}
                  {h}
                </CommandItem>
              ))}
            </CommandList>
          </Command>

          {/* Minute */}
          <Command>
            <Label className="p-2 font-semibold">Phút</Label>

            <CommandList className="h-60 border rounded-md">
              {minutes.map((m) => (
                <CommandItem
                  key={m}
                  onSelect={() => {
                    updateTime(m, minute);
                  }}
                  className={`${minute === m && "bg-gray-100"} cursor-pointer data-[selected=true]:bg-transparent data-[highlighted]:bg-transparent`}
                >
                  {m === minute && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                  )}
                  {m}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>

        <div className="flex justify-end p-2">
          <Label
            className="
              cursor-pointer 
              font-semibold 
              text-custom-root
              hover:text-custom-darkroot
            "
            onClick={() => setOpen(false)}
          >
            Done
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicked;
