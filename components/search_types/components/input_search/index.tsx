"use client";

import { useEffect, useRef, useState } from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

import SearchInput from "./components/SearchInput";
import SearchDropdown from "./components/SearchDropdown";

import { useSearch } from "./hooks/use-search";
import { useKeyboard } from "./hooks/use-keyboard";

import { InputSearchProps } from "./type";
import {
  AirportNode,
  AirportTransferNode,
  BusNode,
  CarRentalNode,
  CityNode,
  GroupedSearchResult,
  HotelNode,
  SearchItem,
  YachtNode,
} from "../types";

export default function InputSearch({
  cityData,
  airportsData,
  hotelData,
  busData,
  carRentalData,
  yachtData,
  placeholder,
  icon,
  contentNotFound,
  label,
  typeData,
  type,
  setValue,
  value,
}: InputSearchProps) {
  /* ================= STATE ================= */

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /* ================= SEARCH ================= */

  const { safeResults } = useSearch({
    cityData,
    airportsData,
    hotelData,
    busData,
    carRentalData,
    yachtData,
    value,
  });

  /* ================= SCROLL ACTIVE ================= */

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeIndex, safeResults]);

  /* ================= SIMPLE VALUE SET ================= */

  const closeWithValue = (item: SearchItem) => {
    setValue(item);
    setOpen(false);
  };

  /* ================= TYPE DISPATCH MAP ================= */

  const handlerMap = {
    city: (item: CityNode) => closeWithValue(item),
    airport: (item: AirportNode) => closeWithValue(item),
    hotel: (item: HotelNode) => closeWithValue(item),
    bus: (item: BusNode) => closeWithValue(item),
    transfer: (item: AirportTransferNode) => closeWithValue(item),
    car_rental: (item: CarRentalNode) => closeWithValue(item),
    yacht: (item: YachtNode) => closeWithValue(item),
  };

  /* ================= SINGLE SELECT ================= */

  const handleSelect = (item: GroupedSearchResult) => {
    if (item.type === "city_group") return;

    handlerMap[item.type]?.(item.raw as never);
  };

  const handleNearMe = () => {
    closeWithValue({
      type: "city",
      name: "Gần tôi",
      id: "near_me",
    } as CityNode);
  };

  /* ================= KEYBOARD ================= */

  useKeyboard({
    results: safeResults,
    activeIndex,
    setActiveIndex,
    onSelect: handleSelect,
  });

  /* ================= UI ================= */

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div>
          <SearchInput
            value={value}
            placeholder={placeholder}
            icon={icon}
            type={type}
            onFocus={() => setOpen(true)}
            onChange={(v) => {
              setActiveIndex(0);
              setValue(v);
              if (!open) setOpen(true);
            }}
          />
        </div>
      </PopoverAnchor>

      <PopoverContent
        className="w-[300px] lg:w-[600px] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SearchDropdown
          results={safeResults}
          activeIndex={activeIndex}
          itemRefs={itemRefs}
          label={label}
          value={typeof value === "string" ? value : value.name || ""}
          contentNotFound={contentNotFound}
          onSelect={handleSelect}
          onNearMe={handleNearMe}
          typeData={typeData}
          type={type}
        />
      </PopoverContent>
    </Popover>
  );
}
