import { CommandItem } from "@/components/ui/command";

import { Navigation } from "lucide-react";
import { AirportTransferNode, GroupedSearchResult } from "../../../types";
import { highlightMatch } from "../../../search/utils/hightlight_Text";

interface Props {
  item: Extract<
    AirportTransferNode,
    {
      type: "transfer";
    }
  >;
  active: boolean;
  refItem: (el: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  query: string;
}

export default function TransferItem({
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
          type: "transfer",
          id: item.id,
          name: item.name,
          searchText: item.name,
          raw: item,
        })
      }
      className={`cursor-pointer shadow-sm px-3 py-2 ${active ? "bg-gray-100" : ""} `}
    >
      <div className="flex items-center gap-3">
        <Navigation className="h-5 w-5 text-gray-400 " />

        <div>
          <div className="font-medium">{highlightMatch(item.name, query)}</div>

          <div className="text-xs text-gray-400">
            {item.address.houseNumber},{item.address.street},{item.address.ward}
            ,{item.address.district},{item.province},{item.country}
          </div>
        </div>
      </div>
    </CommandItem>
  );
}
