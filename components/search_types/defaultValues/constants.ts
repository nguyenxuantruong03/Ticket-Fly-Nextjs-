import { format, addDays } from "date-fns";

const todayDate = new Date();

export const today = format(todayDate, "yyyy-MM-dd");
export const tomorrow = format(addDays(todayDate, 1), "yyyy-MM-dd");

export const DEFAULT_PASSENGER_ROOM = {
  room: 1,
  adult: 1,
  kid: 0,
};
