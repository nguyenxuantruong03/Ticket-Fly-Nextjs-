import {
  AirportNode,
  TicketFlyValue,
} from "@/components/search_types/components/types";
import { today, tomorrow } from "./constants";

export const ticketFlyDefault = (): TicketFlyValue => ({
  from: {
    id: "",
    name: "",
  } as AirportNode,

  to: {
    id: "",
    name: "",
  } as AirportNode,

  dateStart: {
    from: today,
  },

  dateEnd: {
    from: tomorrow,
  },

  return_and_depart: true,
});
