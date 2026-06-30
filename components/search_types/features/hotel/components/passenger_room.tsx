import InputRoomPassenger from "@/components/search_types/components/input_room_passenger";
import { PassengerRoom } from "@/components/search_types/components/types";

interface PassengerandRoomProps {
  value: PassengerRoom;
  setValue: (value: PassengerRoom) => void;
}

const PassengerandRoom = ({ value, setValue }: PassengerandRoomProps) => {
  return <InputRoomPassenger type="hotel" value={value} setValue={setValue} />;
};

export default PassengerandRoom;
