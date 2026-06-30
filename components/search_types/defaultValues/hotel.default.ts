import {
  HotelNode,
  HotelValue,
} from "@/components/search_types/components/types";
import { today, tomorrow, DEFAULT_PASSENGER_ROOM } from "./constants";

export const hotelDefault = (): HotelValue => ({
  destination: {
    id: "",
    name: "",
  } as HotelNode,
  time: {
    from: today,
    to: tomorrow,
  },
  passengerandroom: DEFAULT_PASSENGER_ROOM,
});
