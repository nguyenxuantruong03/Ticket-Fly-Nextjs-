"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  HotelNode,
  SearchItem,
} from "@/components/search_types/components/types";
import {
  airportsData,
  citiesData,
  hotelsData,
} from "@/components/search_types/data";

interface DestinationProps {
  value?: HotelNode;
  setValue: (value: SearchItem | string | null) => void;
}

const Destination = ({ setValue, value }: DestinationProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        value={value ?? ""}
        setValue={setValue}
        hotelData={hotelsData}
        cityData={citiesData}
        airportsData={airportsData}
        icon="map-pin"
        placeholder="Tìm thành phố, điểm đến..."
        contentNotFound="Không tìm thấy địa điểm phù hợp"
        typeData="hotel"
      />
    </div>
  );
};

export default Destination;
