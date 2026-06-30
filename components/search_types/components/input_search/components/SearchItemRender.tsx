import CityItem from "./items/CityItem";
import AirportItem from "./items/AirportItem";
import HotelItem from "./items/HotelItem";
import BusItem from "./items/BusItem";
import TransferItem from "./items/TransferItem";
import CarRentalItem from "./items/CarRentalItem";
import YachtItem from "./items/YachtItem";
import {
  AirportNode,
  GroupedSearchResult,
  SearchIndexItem,
  TypeData,
} from "../../types";
import { TypeKey } from "../type";

interface Props {
  item: GroupedSearchResult;
  index: number;
  active: boolean;
  setItemRef: (index: number, element: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  typeData?: TypeData;
  value: string;
  type?: TypeKey;
}

export default function SearchItemRender({
  item,
  index,
  active,
  setItemRef,
  onSelect,
  typeData,
  value,
  type
}: Props) {
  const handleRef = (element: HTMLDivElement | null) => {
    setItemRef(index, element);
  };

  switch (item.type) {
    case "city_group":
      return (
        <div ref={handleRef}>
          <CityItem
            item={item.city}
            hotelCount={item.city.hotelCount}
            refItem={handleRef}
            onSelect={onSelect}
            typeData={typeData}
            query={value}
            type={type}
          />

          {item.airports.map((a: SearchIndexItem) => (
            <AirportItem
              key={a.id}
              item={a.raw as AirportNode}
              city={item.city}
              onSelect={onSelect}
              refItem={handleRef}
              active={active}
              typeData={typeData}
              query={value}
            />
          ))}
        </div>
      );

    case "hotel":
      return (
        <HotelItem
          hotel={item.raw}
          active={active}
          refItem={handleRef}
          onSelect={onSelect}
          query={value}
        />
      );

    case "bus":
      return (
        <BusItem
          item={item.raw}
          active={active}
          refItem={handleRef}
          onSelect={onSelect}
          query={value}
        />
      );

    case "transfer":
      return (
        <TransferItem
          item={item.raw}
          active={active}
          refItem={handleRef}
          onSelect={onSelect}
          query={value}
        />
      );

    case "car_rental":
      return (
        <CarRentalItem
          item={item.raw}
          active={active}
          refItem={handleRef}
          onSelect={onSelect}
          query={value}
        />
      );

    case "yacht":
      return (
        <YachtItem
          item={item.raw}
          active={active}
          refItem={handleRef}
          onSelect={onSelect}
          query={value}
        />
      );

    default:
      return null;
  }
}
