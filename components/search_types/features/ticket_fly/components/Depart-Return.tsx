"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import {
  AirportNode,
  SearchItem,
} from "@/components/search_types/components/types";
import { airportsData, citiesData } from "@/components/search_types/data";
interface DepartandReturnProps {
  icon: IconKey;
  type?: TypeKey;
  value: AirportNode;
  setValue: (value: SearchItem | string | null) => void;
}

const DepartandReturn = ({
  icon,
  type,
  setValue,
  value,
}: DepartandReturnProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        setValue={setValue}
        value={value}
        airportsData={airportsData}
        cityData={citiesData}
        icon={icon}
        type={type}
        typeData="airport"
        label="Tìm kiếm gần đây"
      />
    </div>
  );
};

export default DepartandReturn;
