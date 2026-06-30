"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import { BusNode, SearchItem } from "@/components/search_types/components/types";
import { busesData, citiesData } from "@/components/search_types/data";

interface DepartandReturnTicketBusProps {
  icon: IconKey;
  type: TypeKey;
  value: BusNode;
  setValue: (value: SearchItem | string | null) => void;
}

const DepartandReturnTicketBus = ({
  icon,
  type,
  setValue,
  value,
}: DepartandReturnTicketBusProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        busData={busesData}
        cityData={citiesData}
        icon={icon}
        type={type}
        setValue={setValue}
        value={value ?? ""}
        label="Tìm kiếm gần đây"
      />
    </div>
  );
};

export default DepartandReturnTicketBus;
