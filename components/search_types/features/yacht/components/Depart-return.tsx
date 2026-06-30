"use client";

import InputSearch from "@/components/search_types/components/input_search";
import {
  IconKey,
  TypeKey,
} from "@/components/search_types/components/input_search/type";
import {
  SearchItem,
  YachtNode,
} from "@/components/search_types/components/types";
import { yachtsData } from "@/components/search_types/data";

interface DepartandReturnYatchProps {
  icon: IconKey;
  type?: TypeKey;
  value: YachtNode;
  setValue: (value: SearchItem | string | null) => void;
}

const DepartandReturnYatch = ({
  icon,
  type,
  value,
  setValue,
}: DepartandReturnYatchProps) => {
  return (
    <div className="w-full max-w-2xl">
      <InputSearch
        value={value ?? ""}
        setValue={setValue}
        yachtData={yachtsData}
        icon={icon}
        type={type}
        label="Tìm kiếm gần đây"
      />
    </div>
  );
};

export default DepartandReturnYatch;
