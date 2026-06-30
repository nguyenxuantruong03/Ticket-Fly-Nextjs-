import DayCarRental from "./components/days";
import PlaceRentCar from "./components/place_rent_car";
import TimeCarRental from "./components/times";
import {
  CarRentalNode,
  CarRentalValue,
  ValidationError,
} from "../../components/types";
import FeatureGrid from "../../components/searchBar";

interface CarRentalFeatureProps {
  value: CarRentalValue;
  setValue: React.Dispatch<React.SetStateAction<CarRentalValue>>;
  errorText: ValidationError[];
}
const carRentalFields = [
  { label: "Địa điểm thuê xe của bạn", field: "place" },
  { label: "Ngày bắt đầu", field: "dateStart" },
  { label: "Giờ bắt đầu", field: "timeStart" },
  { label: "Ngày kết thúc", field: "dateEnd" },
  { label: "Giờ kết thúc", field: "timeEnd" },
];

const CarRentalFeature = ({
  value,
  setValue,
  errorText,
}: CarRentalFeatureProps) => {
  return (
    <div>
      <FeatureGrid
        errorText={errorText}
        fields={carRentalFields}
        mode="carRental"
      >
        <div className="p-1.5">
          <PlaceRentCar
            setValue={(v) => {
              setValue((prev) => ({
                ...prev,
                place: v as CarRentalNode,
              }));
            }}
            value={value.place}
            icon="key-square"
            type="depart"
          />
        </div>

        <div className="p-1.5">
          <DayCarRental
            value={value.dateStart}
            setValue={(v) => {
              if (!v?.from) return;

              setValue((prev) => ({
                ...prev,
                dateStart: v,
              }));
            }}
            typeData="start"
          />
        </div>
        <div className="p-1.5">
          <TimeCarRental
            value={value.timeStart}
            setValue={(time) => {
              setValue((prev) => ({
                ...prev,
                timeStart: time,
              }));
            }}
          />
        </div>

        <div className="p-1.5">
          <DayCarRental
            typeData="end"
            value={value.dateEnd}
            setValue={(v) => {
              if (!v?.from) return;

              setValue((prev) => ({
                ...prev,
                dateEnd: v,
              }));
            }}
          />
        </div>

        <div className="p-1.5">
          <TimeCarRental
            value={value.timeEnd}
            setValue={(time) => {
              setValue((prev) => ({
                ...prev,
                timeEnd: time,
              }));
            }}
          />
        </div>
      </FeatureGrid>
    </div>
  );
};

export default CarRentalFeature;
