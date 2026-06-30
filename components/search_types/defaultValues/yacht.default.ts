import {
  YachtNode,
  YachtValue,
} from "@/components/search_types/components/types";
import { today, tomorrow, DEFAULT_PASSENGER_ROOM } from "./constants";

export const yachtDefault = (): YachtValue => ({
  from: {
    id: "",
    name: "",
  } as YachtNode,

  to: {
    id: "",
    name: "",
  } as YachtNode,
  dateStart: {
    from: today,
  },
  dateEnd: {
    from: tomorrow,
  },
  return_and_depart: true,
  passengerandroom: DEFAULT_PASSENGER_ROOM,
});
