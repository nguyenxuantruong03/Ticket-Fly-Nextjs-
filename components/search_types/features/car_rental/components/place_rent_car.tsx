"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import { CarRentalNode, SearchItem } from "@/components/search_types/components/types";
import { carRentalsData } from "@/components/search_types/data";

interface PlaceRentCarProps {
  icon: IconKey;
  type?: TypeKey;
  value: CarRentalNode;
  setValue: (value: SearchItem | string | null) => void;
}

const PlaceRentCar = ({ icon, type, value, setValue }: PlaceRentCarProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        setValue={setValue}
        value={value ?? ""}
        carRentalData={carRentalsData}
        icon={icon}
        type={type}
        label="Tìm kiếm gần đây"
      />
    </div>
  );
};

export default PlaceRentCar;
