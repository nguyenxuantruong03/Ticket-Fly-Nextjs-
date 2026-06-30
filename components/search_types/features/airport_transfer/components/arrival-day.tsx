import DatePicked from "@/components/search_types/components/date_picked";

interface ArrivalDayAirportTransferProps {
  value: {
    from: string;
  };
  setValue: (value: { from: string } | undefined) => void;
}

const ArrivalDayAirportTransfer = ({
  value,
  setValue,
}: ArrivalDayAirportTransferProps) => {
  return (
    <div>
      <DatePicked type="single" date={value} setDate={setValue} />
    </div>
  );
};

export default ArrivalDayAirportTransfer;
