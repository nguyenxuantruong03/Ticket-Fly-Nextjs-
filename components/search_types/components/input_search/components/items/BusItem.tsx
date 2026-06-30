import { CommandItem } from "@/components/ui/command";

import { Bus } from "lucide-react";
import { BusNode, GroupedSearchResult } from "../../../types";
import { highlightMatch } from "../../../search/utils/hightlight_Text";

interface Props {
  item: Extract<
    BusNode,
    {
      type: "bus";
    }
  >;
  active: boolean;
  refItem: (el: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  query: string;
}

export default function BusItem({
  item,
  active,
  refItem,
  onSelect,
  query,
}: Props) {
  return (
    <CommandItem
      ref={refItem}
      value={item.name}
      onSelect={() =>
        onSelect({
          type: "bus",
          id: item.id,
          name: item.name,
          searchText: item.name,
          cityId: item.cityId,
          raw: item,
        })
      }
      className={`cursor-pointer shadow-sm px-3 py-2 ${active ? "bg-gray-100" : ""} `}
    >
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-3">
          <Bus className=" h-5 w-5 text-gray-400 " />
          <div>
            <div className="font-medium">
              {highlightMatch(item.name, query)}
            </div>
            <div className="text-xs text-gray-400">
              {item.cityId}·{item.aliases?.[0]}
            </div>
          </div>
        </div>

        {/* <div className="bg-custom-darkroot_RGBA p-1 rounded-full">
          {item.tags[0]}
        </div> */}
      </div>
    </CommandItem>
  );
}
