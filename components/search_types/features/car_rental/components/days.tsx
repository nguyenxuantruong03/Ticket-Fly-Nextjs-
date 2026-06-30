import DatePicked from "@/components/search_types/components/date_picked";

interface DayCarRentalProps {
  typeData: string;
  value: {
    from: string;
  };
  setValue: (value: { from: string } | undefined) => void;
}

const DayCarRental = ({ value, setValue }: DayCarRentalProps) => {
  return (
    <div className="flex items-center">
      <DatePicked date={value} setDate={setValue} type="single" />
    </div>
  );
};

export default DayCarRental;
