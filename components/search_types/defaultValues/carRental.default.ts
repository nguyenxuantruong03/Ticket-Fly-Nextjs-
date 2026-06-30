import {
  CarRentalNode,
  CarRentalValue,
} from "@/components/search_types/components/types";
import { today, tomorrow } from "./constants";

export const carRentalDefault = (): CarRentalValue => ({
  place: {
    id: "",
    name: "",
  } as CarRentalNode,
  dateStart: {
    from: today,
  },
  dateEnd: {
    from: tomorrow,
  },
  timeStart: "09:00",
  timeEnd: "09:00",
});
