import DatePicked from "@/components/search_types/components/date_picked";

type FromToYachtProps =
  | {
      typeData: "dateStart";
      checked?: boolean;
      setOpenDate?: (value: boolean) => void;
      openDate?: boolean;
      setChecked?: (value: boolean) => void;
      value: { from: string };
      setValue: (value: { from: string }) => void;
    }
  | {
      typeData: "dateEnd";
      checked?: boolean;
      setOpenDate?: (value: boolean) => void;
      openDate?: boolean;
      setChecked?: (value: boolean) => void;
      value: { from: string | null };
      setValue: (value: { from: string | null }) => void;
    };
const FromToYacht = (props: FromToYachtProps) => {
  if (props.typeData === "dateStart") {
    return (
      <DatePicked
        type="single"
        typeData="dateStart"
        checked={props.checked}
        setOpenDate={props.setOpenDate}
        openDate={props.openDate}
        setChecked={props.setChecked}
        date={props.value}
        setDate={props.setValue}
      />
    );
  }

  return (
    <DatePicked
      type="single"
      typeData="dateEnd"
      checked={props.checked}
      setOpenDate={props.setOpenDate}
      openDate={props.openDate}
      setChecked={props.setChecked}
      date={props.value}
      setDate={props.setValue}
    />
  );
};
export default FromToYacht;
