import DatePicked from "@/components/search_types/components/date_picked";

interface CheckinandCheckoutProps {
  value: {
    from: string;
    to: string;
  };
  setValue: (value: { from: string; to: string } | undefined) => void;
}

const CheckinandCheckout = ({ value, setValue }: CheckinandCheckoutProps) => {
  return (
    <div>
      <DatePicked type="range" date={value} setDate={setValue} />
    </div>
  );
};

export default CheckinandCheckout;
