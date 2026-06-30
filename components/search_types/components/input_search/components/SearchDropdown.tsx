import { Command, CommandList } from "@/components/ui/command";

import { LocateFixed } from "lucide-react";

import SearchItemRender from "./SearchItemRender";
import { GroupedSearchResult, TypeData } from "../../types";
import { TypeKey } from "../type";

interface Props {
  results: GroupedSearchResult[];
  activeIndex: number;
  itemRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
  label?: string;
  value: string;
  contentNotFound?: string;
  onSelect: (item: GroupedSearchResult) => void;
  onNearMe: () => void;
  typeData?: TypeData;
  type?: TypeKey
}

export default function SearchDropdown({
  results,
  activeIndex,
  itemRefs,
  label,
  value,
  contentNotFound,
  onSelect,
  onNearMe,
  typeData,
  type
}: Props) {
  return (
    <Command shouldFilter={false}>
      <CommandList>
        {results.some((item) => item.type === "airport" && label) && (
          <div className="p-1 text-sm bg-gray-300 text-gray-600 ">{label}</div>
        )}

        {results.some((item) => item.type === "hotel") &&
          !value &&
          typeData === "hotel" && (
            <div className="p-3">
              <div
                onClick={onNearMe}
                className="text-custom-darkroot flex items-center space-x-1 p-2.5 border shadow-sm rounded-md cursor-pointer "
              >
                <LocateFixed className="h-5 w-5" />
                <span className="text-lg">Gần tôi</span>
              </div>

              <p className="font-bold text-2xl my-1 mt-4 ">Điểm đến phổ biến</p>
            </div>
          )}

        {results.length > 0 ? (
          results.map((raw, index) => (
            <SearchItemRender
              key={index}
              item={raw}
              index={index}
              value={value}
              active={index === activeIndex}
              setItemRef={(i, el) => {
                itemRefs.current[i] = el;
              }}
              onSelect={onSelect}
              typeData={typeData}
              type={type}
            />
          ))
        ) : (
          <div className="p-3 text-sm text-gray-400">
            {contentNotFound || "No results"}
          </div>
        )}
      </CommandList>
    </Command>
  );
}
