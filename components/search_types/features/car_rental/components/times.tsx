import TimePicked from "@/components/search_types/components/time_picked";

interface TimeCarRentalProps {
  value: string;
  setValue: (value: string) => void;
}

const TimeCarRental = ({ value, setValue }: TimeCarRentalProps) => {
  return <TimePicked value={value} setValue={setValue} minuteType="half" />;
};

export default TimeCarRental;
