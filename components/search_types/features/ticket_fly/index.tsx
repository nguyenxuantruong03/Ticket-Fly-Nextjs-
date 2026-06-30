"use client";
import DepartandReturn from "./components/Depart-Return";
import FromTo from "./components/From-To";
import { useState } from "react";
import {
  AirportNode,
  TicketFlyValue,
  ValidationError,
} from "../../components/types";
import FeatureGrid from "../../components/searchBar";

interface TicketFlyFeatureProps {
  value: TicketFlyValue;
  setValue: React.Dispatch<React.SetStateAction<TicketFlyValue>>;
  errorText: ValidationError[];
}

const ticketFlyFieldsPart1 = [
  { label: "Từ", field: "from" },
  { label: "Đến", field: "to" },
];

const ticketFlyFieldsPart2 = [
  { label: "Ngày khởi hành", field: "dateStart" },
  { label: "Ngày trở về", field: "dateEnd" },
];

const TicketFlyFeature = ({
  setValue,
  value,
  errorText,
}: TicketFlyFeatureProps) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <div className="lg:flex gap-x-5 items-center justify-between w-full">
      <FeatureGrid
        value={value}
        setValue={setValue}
        errorText={errorText}
        insertIndex={0.5}
        fields={ticketFlyFieldsPart1}
        mode="ticketFly"
      >
        <div className="p-1.5">
          <DepartandReturn
            value={value.from}
            setValue={(v) => {
              setValue((prev) => ({
                ...prev,
                from: v as AirportNode,
              }));
            }}
            icon={"plane-takeoff"}
            type={"depart"}
          />
        </div>
        <div className="p-1.5">
          <DepartandReturn
            value={value.to}
            setValue={(v) => {
              setValue((prev) => ({
                ...prev,
                to: v as AirportNode,
              }));
            }}
            icon={"plane-landing"}
            type={"return"}
          />
        </div>
      </FeatureGrid>

      <FeatureGrid
        errorText={errorText}
        fields={ticketFlyFieldsPart2}
        value={value}
        setValue={setValue}
        setOpenDate={setOpenDate}
        mode="ticketFly"
      >
        <div className="p-1.5">
          <FromTo
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
          <FromTo
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
              if (!date) return;

              setValue((prev) => ({
                ...prev,
                dateEnd: {
                  from: date.from ?? null,
                },
              }));
            }}
          />
        </div>
      </FeatureGrid>
    </div>
  );
};

export default TicketFlyFeature;
