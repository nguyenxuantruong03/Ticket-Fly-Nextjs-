import { Input } from "@/components/ui/input";

import { icons } from "../icons";
import { IconKey, TypeKey } from "../type";
import { SearchItem } from "../../types";

interface Props {
  value: SearchItem | string;
  placeholder?: string;
  icon?: IconKey;
  type?: TypeKey;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export default function SearchInput({
  value,
  placeholder,
  icon,
  type,
  onChange,
  onFocus,
}: Props) {
  const Icon = icon ? icons[icon] : null;
  
  return (
    <div className={`${type === "return" ? "lg:px-3" : ""} relative w-full`}>
      {Icon && (
        <Icon
          className={` absolute h-6 w-6 text-custom-root ${type === "return" ? "left-2 lg:left-5" : "left-2"} top-1.5 ${icon === "busback" ? "scale-x-[-1]" : ""} `}
        />
      )}

      <div className="pl-10 border rounded-full lg:border-none lg:rounded-none ">
        <Input
          value={typeof value === "string" ? value : (value?.name ?? "")}
          placeholder={placeholder || "Search..."}
          onFocus={(e) => {
            onFocus();
            e.currentTarget.select();
          }}
          onChange={(e) => onChange(e.target.value)}
          className="p-0 !text-lg shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
