"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import { AirportTransferNode, SearchItem } from "@/components/search_types/components/types";
import {
  hotelsData,
  citiesData,
  airportsData,
} from "@/components/search_types/data";

interface ToAirportTransferProps {
  icon: IconKey;
  type?: TypeKey;
  value: AirportTransferNode;
  setValue: (value: SearchItem | null | string) => void;
}

const ToAirportTransfer = ({
  icon,
  type,
  value,
  setValue,
}: ToAirportTransferProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        setValue={setValue}
        value={value}
        hotelData={hotelsData}
        cityData={citiesData}
        airportsData={airportsData}
        icon={icon}
        type={type}
        typeData="transfer"
        label="Tìm kiếm gần đây"
      />
    </div>
  );
};

export default ToAirportTransfer;
