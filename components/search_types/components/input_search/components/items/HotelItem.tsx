import { CommandItem } from "@/components/ui/command";
import { GroupedSearchResult, HotelNode } from "../../../types";
import { highlightMatch } from "../../../search/utils/hightlight_Text";

interface Props {
  hotel: Extract<
    HotelNode,
    {
      type: "hotel";
    }
  >;
  active: boolean;
  refItem: (el: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  query: string;
}

export default function HotelItem({
  hotel,
  active,
  refItem,
  onSelect,
  query,
}: Props) {
  return (
    <CommandItem
      ref={refItem}
      value={hotel.name}
      onSelect={() =>
        onSelect({
          type: "hotel",
          id: hotel.id,
          name: hotel.name,
          searchText: hotel.name,
          cityId: hotel.cityId,
          raw: hotel,
        })
      }
      className={`cursor-pointer shadow-sm px-3 py-2 ${active ? "bg-gray-100" : ""}`}
    >
      <div className=" flex items-center justify-between w-full">
        <div>
          <p className="font-medium">{highlightMatch(hotel.name, query)}</p>

          <p className="text-sm text-gray-400">
            {hotel.address.houseNumber},{hotel.address.street},
            {hotel.address.ward},{hotel.address.district},{hotel.province},
            {hotel.country}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <span className=" bg-custom-darkroot_RGBA text-custom-darkroot px-2 py-1 rounded-full ">
            {hotel.type}
          </span>
        </div>
      </div>
    </CommandItem>
  );
}
