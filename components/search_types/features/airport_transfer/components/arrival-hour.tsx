import TimePicked from "@/components/search_types/components/time_picked";

interface ArrivalHourAirportTransferProps {
  value: string;
  setValue: (value: string) => void;
}

const ArrivalHourAirportTransfer = ({
  value,
  setValue,
}: ArrivalHourAirportTransferProps) => {
  return (
    <div>
      <TimePicked minuteType="half" value={value} setValue={setValue} />
    </div>
  );
};

export default ArrivalHourAirportTransfer;
