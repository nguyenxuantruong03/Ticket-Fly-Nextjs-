import InputRoomPassenger, {
  BusValue,
} from "@/components/search_types/components/input_room_passenger";

interface SheetTicketBusProps {
  value: BusValue;
  setValue: (value: BusValue) => void;
}

const SheetTicketBus = ({ value, setValue }: SheetTicketBusProps) => {
  return <InputRoomPassenger type="bus" value={value} setValue={setValue} />;
};

export default SheetTicketBus;
