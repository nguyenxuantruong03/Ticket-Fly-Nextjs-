"use client";
import DepartandReturnYatch from "./components/Depart-return";
import FromToYatch from "./components/From-To";
import { useState } from "react";
import PassengerandRoomYatch from "./components/sheet";
import { ValidationError, YachtNode, YachtValue } from "../../components/types";
import FeatureGrid from "../../components/searchBar";
const yachtFields = [
  { label: "Từ", field: "from" },
  { label: "Đến", field: "to" },
  { label: "Ngày đi", field: "dateStart" },
  { label: "Ngày trở về", field: "dateEnd" },
  {
    label: "khách & phòng",
    fields: [
      "passengerandroom.adult",
      "passengerandroom.room",
      "passengerandroom.kid",
    ],
  },
];

interface YachtFeatureProps {
  value: YachtValue;
  setValue: React.Dispatch<React.SetStateAction<YachtValue>>;
  errorText: ValidationError[];
}

const YachtFeature = ({ value, setValue, errorText }: YachtFeatureProps) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <FeatureGrid
      errorText={errorText}
      insertIndex={0.5}
      setValue={setValue}
      value={value}
      setOpenDate={setOpenDate}
      fields={yachtFields}
      mode="yacht"
    >
      <div className="p-1.5">
        <DepartandReturnYatch
          value={value.from}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              from: v as YachtNode,
            }));
          }}
          icon={"flag-triangle-right"}
          type="depart"
        />
      </div>

      <div className="p-1.5">
        <DepartandReturnYatch
          value={value.to}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              to: v as YachtNode,
            }));
          }}
          icon="map-pin"
          type="return"
        />
      </div>

      <div className="p-1.5">
        <FromToYatch
          typeData="dateStart"
          value={value.dateStart}
          setValue={(date) => {
            setValue((prev) => ({
              ...prev,
              dateStart: date,
            }));
          }}
        />
      </div>
      <div
        className={`${value.return_and_depart === false && "bg-gray-200"} p-1.5`}
      >
        <FromToYatch
          typeData="dateEnd"
          checked={value.return_and_depart}
          setOpenDate={setOpenDate}
          openDate={openDate}
          setChecked={(check) => {
            setValue((prev) => ({
              ...prev,
              return_and_depart: check,
            }));
          }}
          value={value.dateEnd ?? { from: null }}
          setValue={(date) => {
            setValue((prev) => ({
              ...prev,
              dateEnd: date,
            }));
          }}
        />
      </div>
      <div className="p-1.5">
        <PassengerandRoomYatch
          value={value.passengerandroom}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              passengerandroom: v,
            }));
          }}
        />
      </div>
    </FeatureGrid>
  );
};

export default YachtFeature;
