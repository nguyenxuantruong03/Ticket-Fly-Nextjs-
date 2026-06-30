import {
  AirportTransferNode,
  AirportTransferValue,
} from "@/components/search_types/components/types";
import { today } from "./constants";

export const airportTransferDefault = (): AirportTransferValue => ({
  from: {
    id: "",
    name: "",
  } as AirportTransferNode,

  to: {
    id: "",
    name: "",
  } as AirportTransferNode,

  arrivalDay: {
    from: today,
  },
  arrivalHour: "09:00",
});
