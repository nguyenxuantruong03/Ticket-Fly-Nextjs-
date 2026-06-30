import InputRoomPassenger from "@/components/search_types/components/input_room_passenger";
import { PassengerRoom } from "@/components/search_types/components/types";

interface PassengerandRoomYatchProps {
  value: PassengerRoom;
  setValue: (value: PassengerRoom) => void;
}

const PassengerandRoomYatch = ({
  value,
  setValue,
}: PassengerandRoomYatchProps) => {
  return (
    <div>
      <InputRoomPassenger
        setValue={setValue}
        value={value}
        type="yacht"
        showOnlyIcon={true}
      />
    </div>
  );
};

export default PassengerandRoomYatch;
