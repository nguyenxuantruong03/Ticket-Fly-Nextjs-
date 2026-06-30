"use client";
import { useState } from "react";
import FromToTicketBus from "./components/From-To";
import SheetTicketBus from "./components/sheet";
import DepartandReturnTicketBus from "./components/Depart-Return";
import {
  BusNode,
  TicketBusValue,
  ValidationError,
} from "../../components/types";
import FeatureGrid from "../../components/searchBar";

interface TicketBusFeatureProps {
  value: TicketBusValue;
  setValue: React.Dispatch<React.SetStateAction<TicketBusValue>>;
  errorText: ValidationError[];
}

const ticketBusFields = [
  { label: "Từ", field: "from" },
  { label: "Đến", field: "to" },
  { label: "Ngày khởi hành", field: "dateStart" },
  { label: "Ngày trở về", field: "dateEnd" },
  { label: "Số ghế", field: "passenger" },
];

const TicketBusFeature = ({
  setValue,
  value,
  errorText,
}: TicketBusFeatureProps) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <FeatureGrid
      errorText={errorText}
      fields={ticketBusFields}
      insertIndex={0.5}
      setOpenDate={setOpenDate}
      setValue={setValue}
      value={value}
      mode="ticketBus"
    >
      <div className="p-1.5">
        <DepartandReturnTicketBus
          value={value.from}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              from: v as BusNode,
            }));
          }}
          icon={"bus"}
          type={"depart"}
        />
      </div>
      <div className="p-1.5">
        <DepartandReturnTicketBus
          value={value?.to}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              to: v as BusNode,
            }));
          }}
          icon={"busback"}
          type={"return"}
        />
      </div>

      <div className="p-1.5">
        <FromToTicketBus
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
        <FromToTicketBus
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

      <div className="p-1.5">
        <SheetTicketBus
          value={value.passenger}
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              passenger: v,
            }));
          }}
        />
      </div>
    </FeatureGrid>
  );
};

export default TicketBusFeature;
