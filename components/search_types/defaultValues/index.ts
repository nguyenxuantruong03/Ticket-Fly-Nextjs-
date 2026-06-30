import { airportTransferDefault } from "./airportTransfer.default";
import { hotelDefault } from "./hotel.default";
import { ticketFlyDefault } from "./ticketFly.default";
import { ticketBusDefault } from "./ticketBus.default";
import { carRentalDefault } from "./carRental.default";
import { yachtDefault } from "./yacht.default";
import {
  AirportTransferValue,
  CarRentalValue,
  HotelValue,
  TicketBusValue,
  TicketFlyValue,
  YachtValue,
} from "../components/types";
import { SearchTypeKey, SearchValues } from "../item";

export const getDefaultValue = (
  type: SearchTypeKey,
): SearchValues[SearchTypeKey] => {
  switch (type) {
    case "airport_transfer":
      return airportTransferDefault() as AirportTransferValue;

    case "hotel":
      return hotelDefault() as HotelValue;

    case "ticket_fly":
      return ticketFlyDefault() as TicketFlyValue;

    case "ticket_bus":
      return ticketBusDefault() as TicketBusValue;

    case "car_rental":
      return carRentalDefault() as CarRentalValue;

    case "yacht":
      return yachtDefault() as YachtValue;

    default:
      throw new Error("Invalid search type");
  }
};
