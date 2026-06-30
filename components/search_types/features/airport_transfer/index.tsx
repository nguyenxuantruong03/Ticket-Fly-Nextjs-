import FeatureGrid from "../../components/searchBar";
import {
  AirportTransferNode,
  AirportTransferValue,
  ValidationError,
} from "../../components/types";
import ArrivalDayAirportTransfer from "./components/arrival-day";
import ArrivalHourAirportTransfer from "./components/arrival-hour";
import FromAirportTransfer from "./components/From";
import ToAirportTransfer from "./components/To";

interface AirportTransferProps {
  value: AirportTransferValue;
  setValue: React.Dispatch<React.SetStateAction<AirportTransferValue>>;
  errorText: ValidationError[];
}
const airportTransferFields = [
  { label: "Từ Sân bay", field: "from" },
  { label: "Đến khu vực, địa chỉ, toà nhà", field: "to" },
  { label: "Ngày đón", field: "arrivalDay" },
  { label: "Giờ đón", field: "arrivalHour" },
];
const AirportTransferFeature = ({
  value,
  setValue,
  errorText,
}: AirportTransferProps) => {
  return (
    <div>
      <FeatureGrid
        errorText={errorText}
        insertIndex={0.5}
        fields={airportTransferFields}
        mode="airporttransfer"
      >
        <div className="p-1.5">
          <FromAirportTransfer
            value={value.from}
            setValue={(v) => {
              setValue((prev) => ({
                ...prev,
                from: v as AirportTransferNode,
              }));
            }}
            icon={"plane-takeoff"}
            type="depart"
          />
        </div>
        <div className="p-1.5">
          <ToAirportTransfer
            value={value.to}
            setValue={(v) => {
              setValue((prev) => ({
                ...prev,
                to: v as AirportTransferNode,
              }));
            }}
            icon="map-pin"
            type="return"
          />
        </div>
        <div className="p-1.5">
          <ArrivalDayAirportTransfer
            value={value.arrivalDay}
            setValue={(date) => {
              if (!date?.from) return;

              setValue((prev) => ({
                ...prev,
                arrivalDay: {
                  from: date.from,
                },
              }));
            }}
          />
        </div>
        <div className="p-1.5">
          <ArrivalHourAirportTransfer
            value={value.arrivalHour}
            setValue={(time) => {
              setValue((prev) => ({
                ...prev,
                arrivalHour: time,
              }));
            }}
          />
        </div>
      </FeatureGrid>
    </div>
  );
};

export default AirportTransferFeature;
