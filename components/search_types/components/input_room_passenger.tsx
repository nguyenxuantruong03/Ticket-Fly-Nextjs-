"use client";

import { useState } from "react";
import { Command, CommandList } from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

import { Baby, House, Minus, Plus, UserRound, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

/* ================= TYPES ================= */

export type BusValue = {
  passenger: number;
};

export type HotelValue = {
  room: number;
  adult: number;
  kid: number;
};

export type YachtValue = {
  room: number;
  adult: number;
  kid: number;
};

/* ================= HELPERS ================= */
type Value = BusValue | HotelValue | YachtValue;

/* ================= PROPS ================= */

type Props =
  | {
      type: "bus";
      value: BusValue;
      setValue: (v: BusValue) => void;
      showOnlyIcon?: boolean;
    }
  | {
      type: "hotel";
      value: HotelValue;
      setValue: (v: HotelValue) => void;
      showOnlyIcon?: boolean;
    }
  | {
      type: "yacht";
      value: YachtValue;
      setValue: (v: YachtValue) => void;
      showOnlyIcon?: boolean;
    };

/* ================= ITEMS ================= */

type Item = {
  label: string;
  icon: React.ReactNode;
  type: string;
  min: number;
  max: number;
};

const BUS_ITEMS: Item[] = [
  {
    label: "Hành Khách",
    icon: <Users className="h-6 w-6 text-custom-root" />,
    type: "passenger",
    min: 1,
    max: 30,
  },
];

const HOTEL_ITEMS: Item[] = [
  {
    label: "Người lớn",
    icon: <UserRound className="h-6 w-6 text-custom-root" />,
    type: "adult",
    min: 1,
    max: 30,
  },
  {
    label: "Trẻ em",
    icon: <Baby className="h-6 w-6 text-custom-root" />,
    type: "kid",
    min: 0,
    max: 6,
  },
  {
    label: "Phòng",
    icon: <House className="h-6 w-6 text-custom-root" />,
    type: "room",
    min: 1,
    max: 8,
  },
];

const YACHT_ITEMS = HOTEL_ITEMS;

const AGEKID = Array.from({ length: 17 }, (_, i) => i + 1);

/* ================= COMPONENT ================= */

const InputRoomPassenger = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [ageKid, setAgeKid] = useState<string[]>([]);

  const { type, value, setValue, showOnlyIcon } = props;

  const ITEMS =
    type === "bus" ? BUS_ITEMS : type === "hotel" ? HOTEL_ITEMS : YACHT_ITEMS;

  const isHotelValue = (value: Value): value is HotelValue | YachtValue => {
    return "adult" in value;
  };

  const getValue = (field: string): number => {
    if (field in value) {
      return value[field as keyof typeof value];
    }

    return 0;
  };

  const validate = (label: string, min: number, max: number, v: number) => {
    if (v < min) {
      toast.error(`${label} tối thiểu là ${min}`);
      return false;
    }

    if (v > max) {
      toast.error(`${label} tối đa là ${max}`);
      return false;
    }

    return true;
  };

  const updateValue = (field: string, newValue: number) => {
    if (Number.isNaN(newValue)) return;

    // FIX: chặn số âm
    newValue = Math.max(0, newValue);

    const config = ITEMS.find((i) => i.type === field);
    if (!config) return;

    if (!validate(config.label, config.min, config.max, newValue)) return;

    if (type === "hotel" || type === "yacht") {
      const currentRoom = value.room;
      const currentAdult = value.adult;

      const nextAdult = field === "adult" ? newValue : currentAdult;

      if (field !== "room" && currentRoom > nextAdult) {
        toast.error("Số người không được nhỏ hơn số phòng");
        return;
      }

      if (field === "room" && newValue > nextAdult) {
        toast.error("Số phòng không được lớn hơn số người");
        return;
      }
    }

    if (type === "bus") {
      setValue({
        ...value,
        passenger: newValue,
      });
      return;
    }

    setValue({
      ...value,
      [field]: newValue,
    });
  };

  const handleQuantity = (field: string, action: "plus" | "minus") => {
    const current = getValue(field);

    const next = action === "plus" ? current + 1 : current - 1;

    updateValue(field, next);
  };

  const isHotelLike = type === "hotel" || type === "yacht";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div
          className="flex items-center cursor-pointer h-12 lg:h-10 border rounded-full p-3 lg:border-none lg:rounded-none lg:p-1.5 w-full"
          onClick={() => setOpen(true)}
        >
          {!showOnlyIcon && <Users className="h-6 w-6 text-custom-root mr-2" />}

          {type === "bus" ? (
            <span>{value.passenger} Hành khách</span>
          ) : (
            isHotelValue(value) && (
              <span className="flex items-center space-x-1">
                {HOTEL_ITEMS.map(({ type, label, icon }, index) => (
                  <span key={type} className="flex items-center space-x-1">
                    <span>{value[type as keyof typeof value]}</span>

                    {!showOnlyIcon ? (
                      <span>
                        {label}
                        {index < HOTEL_ITEMS.length - 1 && <span>, </span>}
                      </span>
                    ) : (
                      icon
                    )}
                  </span>
                ))}
              </span>
            )
          )}
        </div>
      </PopoverAnchor>

      <PopoverContent className="p-0 w-[400px]" align="start">
        <Command shouldFilter={false}>
          <CommandList className="p-5">
            {ITEMS.map((item) => (
              <div
                key={item.type}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-2">
                  {item.icon}

                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={getValue(item.type) <= item.min}
                    onClick={() => handleQuantity(item.type, "minus")}
                  >
                    <Minus />
                  </button>

                  <Input
                    className="w-16 text-center"
                    value={getValue(item.type)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      // FIX: cho phép xoá input nhưng không set NaN
                      if (raw === "") {
                        updateValue(item.type, 0);
                        return;
                      }

                      // FIX: chặn ký tự lạ
                      if (!/^\d+$/.test(raw)) return;
                      const num = Number(raw);
                      updateValue(item.type, num);
                    }}
                  />

                  <button
                    disabled={getValue(item.type) >= item.max}
                    onClick={() => handleQuantity(item.type, "plus")}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            ))}

            {isHotelLike && isHotelValue(value) && value.kid >= 1 && (
              <div>
                <p className="text-sm mb-2">Độ tuổi trẻ em</p>

                <div className="grid grid-cols-3 gap-2">
                  {Array.from({
                    length: value.kid,
                  }).map((_, index) => (
                    <Select
                      key={index}
                      value={ageKid[index] || "8"}
                      onValueChange={(v) => {
                        const next = [...ageKid];

                        next[index] = v;

                        setAgeKid(next);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {AGEKID.map((age) => (
                          <SelectItem key={age} value={String(age)}>
                            {age === 1 ? "<1" : age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button onClick={() => setOpen(false)}>Xong</Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputRoomPassenger;
