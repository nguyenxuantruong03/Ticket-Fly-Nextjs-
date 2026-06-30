import { Building2 } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { GroupedSearchResult, SearchIndexItem } from "../../../types";
import { formatNumber } from "@/utils/format_Intl";
import { highlightMatch } from "../../../search/utils/hightlight_Text";
import { TypeKey } from "../../type";

interface Props {
  item: SearchIndexItem;

  refItem: (el: HTMLDivElement | null) => void;
  onSelect: (item: GroupedSearchResult) => void;
  hotelCount?: number;
  typeData?: string;
  query: string;
  type?: TypeKey;
}

export default function CityItem({
  item,
  refItem,
  onSelect,
  typeData,
  hotelCount,
  query,
  type
}: Props) {
  return (
    <div>
      {typeData === "airport" || (typeData === "transfer" && type === "depart") ? (
        <div className={` bg-gray-200 flex items-center gap-2 p-1`}>
          <Building2 className="h-4 w-4 text-gray-400" />
          <div>
            <div className="text-xs">{item.name}</div>
          </div>
        </div>
      ) : (
        <>
          <CommandItem
            ref={refItem}
            value={item.name}
            onSelect={() => onSelect(item)}
            className="cursor-pointer shadow-sm px-3 py-2"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">
                    {highlightMatch(item.name, query)}
                  </div>

                  <div className="text-xs text-gray-400">
                    {item.raw.province} {item.raw.country}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end ">
                <span className=" bg-custom-darkroot_RGBA text-custom-darkroot px-2 py-1 rounded-full ">
                  {item.type}
                </span>
                {typeData === "hotel" && (
                  <span className="text-xs text-gray-500">
                    {formatNumber(Number(hotelCount))}
                    <span className="ml-1">hotels</span>
                  </span>
                )}
              </div>
            </div>
          </CommandItem>
        </>
      )}
    </div>
  );
}
