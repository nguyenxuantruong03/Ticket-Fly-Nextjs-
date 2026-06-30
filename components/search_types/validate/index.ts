import { validateHotel } from "./hotel.validate";
import { validateTicketFly } from "./ticketFly.validate";
import { validateTicketBus } from "./ticketBus.validate";
import { validateCarRental } from "./carRental.validate";
import { validateYacht } from "./yacht.validate";
import { validateAirportTransfer } from "./airportTransfer.validate";

import {
  AirportTransferValue,
  CarRentalValue,
  HotelValue,
  TicketBusValue,
  TicketFlyValue,
  ValidationError,
  YachtValue,
} from "../components/types";

import { SearchTypeKey, SearchValues } from "../item";

export const validateSearchValue = (
  type: SearchTypeKey,
  value: SearchValues[SearchTypeKey],
): ValidationError[] => {
  switch (type) {
    case "hotel":
      return validateHotel(value as HotelValue);

    case "ticket_fly":
      return validateTicketFly(value as TicketFlyValue);

    case "ticket_bus":
      return validateTicketBus(value as TicketBusValue);

    case "car_rental":
      return validateCarRental(value as CarRentalValue);

    case "yacht":
      return validateYacht(value as YachtValue);

    case "airport_transfer":
      return validateAirportTransfer(value as AirportTransferValue);

    default:
      return [];
  }
};