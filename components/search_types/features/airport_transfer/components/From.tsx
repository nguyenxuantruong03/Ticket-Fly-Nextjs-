"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import {
  AirportTransferNode,
  SearchItem,
} from "@/components/search_types/components/types";
import { airportsData, citiesData } from "@/components/search_types/data";

interface FromAirportTransferProps {
  icon: IconKey;
  type?: TypeKey;
  value: AirportTransferNode;
  setValue: (value: SearchItem | null | string) => void;
}

const FromAirportTransfer = ({
  icon,
  type,
  setValue,
  value,
}: FromAirportTransferProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        value={value}
        setValue={setValue}
        cityData={citiesData}
        airportsData={airportsData}
        icon={icon}
        type={type}
        label="Tìm kiếm gần đây"
        typeData="transfer"
      />
    </div>
  );
};

export default FromAirportTransfer;
