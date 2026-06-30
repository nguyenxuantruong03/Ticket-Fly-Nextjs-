import {
  BusNode,
  TicketBusValue,
} from "@/components/search_types/components/types";
import { today, tomorrow } from "./constants";

export const ticketBusDefault = (): TicketBusValue => ({
  from: {
    id: "",
    name: "",
  } as BusNode,

  to: {
    id: "",
    name: "",
  } as BusNode,

  dateStart: {
    from: today,
  },

  dateEnd: {
    from: tomorrow,
  },

  return_and_depart: true,

  passenger: {
    passenger: 1,
  },
});
