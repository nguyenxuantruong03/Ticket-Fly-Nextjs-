import FeatureGrid from "../../components/searchBar";
import { HotelNode, HotelValue, ValidationError } from "../../components/types";
import CheckinandCheckout from "./components/checkin_checkout";
import Destination from "./components/destination";
import PassengerandRoom from "./components/passenger_room";
const hotelFields = [
  { label: "Địa điểm", fields: ["destination"] },

  {
    label: "Ngày nhận / trả phòng",
    fields: ["time.from", "time.to"], // 👈 group 1 label
  },

  {
    label: "Khách & phòng",
    fields: [
      "passengerandroom.adult",
      "passengerandroom.room",
      "passengerandroom.kid",
    ],
  },
];
interface HotelFeature {
  value: HotelValue;
  setValue: React.Dispatch<React.SetStateAction<HotelValue>>;
  errorText: ValidationError[];
}
const HotelFeature = ({ value, setValue, errorText }: HotelFeature) => {
  return (
    <FeatureGrid fields={hotelFields} errorText={errorText} mode="hotel">
      <div className="p-1.5">
        <Destination
          setValue={(v) => {
            setValue((prev) => ({
              ...prev,
              destination: v as HotelNode,
            }));
          }}
          value={value.destination}
        />
      </div>

      <div className="p-1.5">
        <CheckinandCheckout
          value={value.time}
          setValue={(v) => {
            if (!v) return;

            setValue((prev) => ({
              ...prev,
              time: v,
            }));
          }}
        />
      </div>

      <div className="p-1.5">
        <PassengerandRoom
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

export default HotelFeature;
