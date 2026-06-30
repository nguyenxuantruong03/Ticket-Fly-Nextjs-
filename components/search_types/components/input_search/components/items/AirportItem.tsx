import { CommandItem } from "@/components/ui/command";

import { Plane } from "lucide-react";
import {
  AirportNode,
  GroupedSearchResult,
  SearchIndexItem,
  TypeData,
} from "../../../types";
import { highlightMatch } from "../../../search/utils/hightlight_Text";

interface Props {
  item: AirportNode;
  active: boolean;
  city?: SearchIndexItem;
  refItem: (el: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  typeData?: TypeData;
  query: string;
}

export default function AirportItem({
  item,
  active,
  refItem,
  onSelect,
  typeData,
  query,
}: Props) {
  return (
    <CommandItem
      ref={refItem}
      value={item.name}
      onSelect={() =>
        onSelect({
          type: "airport",
          id: item.id,
          name: item.name,
          searchText: item.name,
          cityId: item.cityId,
          raw: item,
        })
      }
      className={`cursor-pointer shadow-sm ${active && typeData !== "hotel" && typeData !== "transfer" ? "bg-gray-100" : ""}`}
    >
      <div
        className={`flex items-center gap-3 w-full  ${typeData === "hotel" || typeData === "transfer" ? "px-1" : " ml-7"}`}
      >
        <div className="flex items-center space-x-2">
          <Plane className=" h-5 w-5 mt-1 text-gray-400 " />

          <div>
            <div className="font-medium">
              {highlightMatch(item.name, query)}

              <span className="text-gray-400">({item.code})</span>
            </div>

            <div className="text-xs text-gray-400">
              {item.name}·{item.country}
            </div>
          </div>
        </div>
        {(typeData === "hotel" || typeData === "transfer") && (
          <div
            className="
      flex
      items-center
      flex-1
      justify-end
      "
          >
            <span className=" bg-custom-darkroot_RGBA text-custom-darkroot px-2 py-1 rounded-full ">
              {item.type}
            </span>
          </div>
        )}
      </div>
    </CommandItem>
  );
}
