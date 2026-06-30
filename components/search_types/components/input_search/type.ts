import {
  AirportNode,
  BusNode,
  CarRentalNode,
  CityNode,
  HotelNode,
  SearchItem,
  SearchResultGroup,
  TypeData,
  YachtNode,
} from "../types";

export type IconKey =
  | "map-pin"
  | "plane-takeoff"
  | "plane-landing"
  | "bus"
  | "busback"
  | "key-square"
  | "flag-triangle-right";

export type TypeKey = "depart" | "return";

export interface InputSearchProps {
  cityData?: CityNode[];
  airportsData?: AirportNode[];
  hotelData?: HotelNode[];
  busData?: BusNode[];
  carRentalData?: CarRentalNode[];
  yachtData?: YachtNode[];
  placeholder?: string;
  icon?: IconKey;
  contentNotFound?: string;
  label?: string;
  type?: TypeKey;
  typeData?: TypeData;
  setValue: (value: SearchItem | string) => void;
  value: string | SearchItem;
}

export interface SearchState {
  open: boolean;
  inputValue: string;
  debouncedValue: string;
  selected: SearchResultGroup | null;
  activeIndex: number;
}
