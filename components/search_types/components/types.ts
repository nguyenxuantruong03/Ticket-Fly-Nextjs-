/* ======================================================
   1. BASE ENTITY (DOMAIN CORE)
====================================================== */

export interface AddressNode {
  id: string;
  name: string;
  street: string;
  district?: string;
  ward?: string;
  houseNumber?: string;
  lat?: number;
  lng?: number;

  precision: "country" | "city" | "district" | "street" | "address" | "point";
}

export interface BaseSearchEntity {
  id: string | number;

  name: string;

  country?: string;
  province?: string;
  region?: string;

  lat: number;
  lng: number;

  aliases: string[];

  searchWeight: number;

  /**
   * precomputed search string (optional but recommended)
   * dùng cho fast matching
   */
  searchText?: string;
}

/* ======================================================
   2. CITY DOMAIN
====================================================== */

export interface CityNode extends BaseSearchEntity {
  type: "city";

  cityId: string;

  subtitle: string;

  popularityScore: number;

  priority: number;
  airportIds: string[];
}

/* ======================================================
   3. AIRPORT DOMAIN
====================================================== */

export interface AirportNode extends BaseSearchEntity {
  type: "airport";

  airportId: string;
  code: string;

  cityId: string;

  priority: number;
}

/* ======================================================
   4. HOTEL DOMAIN
====================================================== */

export interface HotelNode extends BaseSearchEntity {
  type: "hotel";

  hotelId: string;
  addressId: string;
  address: AddressNode;
  cityId: string;
}

/* ======================================================
   5. BUS DOMAIN
====================================================== */

export interface BusNode extends BaseSearchEntity {
  type: "bus";

  busId: string;

  cityId: string;
}

/* ======================================================
   6. AIRPORT TRANSFER DOMAIN
====================================================== */

export interface AirportTransferNode extends BaseSearchEntity {
  type: "transfer";

  transferId: string;

  airportId: string;

  addressId: string;
  address: AddressNode;
}

/* ======================================================
   7. CAR RENTAL DOMAIN
====================================================== */

export interface CarRentalNode extends BaseSearchEntity {
  type: "car_rental";
  rentalId: string;
  provider: string;
  airportId?: string;
  addressId: string;
  address: AddressNode;
}

/* ======================================================
   8. YACHT DOMAIN
====================================================== */

export interface YachtNode extends BaseSearchEntity {
  type: "yacht";
  yachtId: string;
  provider: string;
  cityId: string;
  addressId: string;
  address: AddressNode;
}

/* ======================================================
   9. SEARCH INDEX LAYER (TRAVELOKA CORE 🔥)
====================================================== */
export type TypeData =
  | "city"
  | "airport"
  | "hotel"
  | "bus"
  | "transfer"
  | "car_rental"
  | "yacht";

export type SearchIndexItem =
  | {
      type: "city";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      cityId: string;
      scoreBoost?: number;
      hotelCount: number;
      raw: CityNode;
    }
  | {
      type: "airport";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      cityId: string;
      scoreBoost?: number;
      relation?: {
        city?: CityNode;
      };
      raw: AirportNode;
    }
  | {
      type: "hotel";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      cityId: string;

      scoreBoost?: number;

      raw: HotelNode;
    }
  | {
      type: "bus";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      cityId: string;
      scoreBoost?: number;

      raw: BusNode;
    }
  | {
      type: "transfer";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      scoreBoost?: number;

      raw: AirportTransferNode;
    }
  | {
      type: "car_rental";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      scoreBoost?: number;
      raw: CarRentalNode;
    }
  | {
      type: "yacht";
      id: string | number;
      name: string;
      aliases?: string[];
      searchText: string;
      cityId: string;
      scoreBoost?: number;

      raw: YachtNode;
    };

export type GroupedSearchResult =
  | SearchIndexItem
  | {
      type: "city_group";
      city: SearchIndexItem & { type: "city" };
      airports: SearchIndexItem[];
    };

export type SearchItem =
  | AirportNode
  | CityNode
  | HotelNode
  | BusNode
  | CarRentalNode
  | AirportTransferNode
  | YachtNode;

/* ======================================================
   10. UI SEARCH RESULT (GROUPED)
====================================================== */

export type SearchResultGroup =
  | { type: "city"; items: CityNode[] }
  | { type: "hotel"; items: HotelNode[] }
  | { type: "airport"; items: AirportNode[] }
  | { type: "bus"; items: BusNode[] }
  | { type: "transfer"; items: AirportTransferNode[] }
  | { type: "car_rental"; items: CarRentalNode[] }
  | { type: "yacht"; items: YachtNode[] };

/* ======================================================
   11. SCORING SYSTEM
====================================================== */

export type ScoredItem = {
  id: string | number;
  type: string;

  score: number;

  debug?: {
    exact: number;
    prefix: number;
    tokenOverlap: number;
    fuzzy: number;
    intent: number;
    boost: number;
  };
  item: SearchIndexItem;
};

export type PassengerRoom = {
  room: number;
  adult: number;
  kid: number;
};

export type WithReturnTrip = {
  return_and_depart?: boolean;
  dateStart: { from: string };
  dateEnd?: { from: string | null };
};

export type YachtValue = WithReturnTrip & {
  from: YachtNode;
  to: YachtNode;
  passengerandroom: PassengerRoom;
};

export type TicketFlyValue = WithReturnTrip & {
  from: AirportNode;
  to: AirportNode;
  return_and_depart: boolean;
};

export type TicketBusValue = WithReturnTrip & {
  from: BusNode;
  to: BusNode;
  passenger: { passenger: number };
};

export type HotelValue = {
  destination: HotelNode;
  time: {
    from: string;
    to: string;
  };
  passengerandroom: PassengerRoom;
};

export type CarRentalValue = {
  place: CarRentalNode;
  dateStart: {
    from: string;
  };
  timeStart: string;
  dateEnd: {
    from: string;
  };
  timeEnd: string;
};

export type AirportTransferValue = {
  from: AirportTransferNode;
  to: AirportTransferNode;
  arrivalDay: {
    from: string;
  };
  arrivalHour: string;
};

export type SearchValue =
  | TicketFlyValue
  | TicketBusValue
  | HotelValue
  | YachtValue
  | CarRentalValue
  | AirportTransferValue;

export type SearchValueMap = {
  hotel: HotelValue;
  ticket_fly: TicketFlyValue;
  ticket_bus: TicketBusValue;
  yacht: YachtValue;
  car_rental: CarRentalValue;
  airport_transfer: AirportTransferValue;
};

export type TicketFlyField = "from" | "to" | "dateStart" | "dateEnd";

export type TicketBusField =
  | "from"
  | "to"
  | "dateStart"
  | "dateEnd"
  | "passenger";

export type HotelField = "destination" | "time.from" | "time.to";

export type YachtField =
  | "from"
  | "to"
  | "dateStart"
  | "dateEnd"
  | "passengerandroom";

export type CarRentalField =
  | "place"
  | "dateStart"
  | "dateEnd"
  | "timeStart"
  | "timeEnd";

export type AirportTransferField = "from" | "to" | "arrivalDay" | "arrivalHour";

export type SearchField =
  | TicketFlyField
  | TicketBusField
  | HotelField
  | YachtField
  | CarRentalField
  | AirportTransferField;

export type ValidationError<F extends string = string> = {
  field: F;
  message: string;
};

export type SearchPayloadMap = {
  ticket_fly: TicketFlyValue & { dateEnd?: TicketFlyValue["dateEnd"] };
  ticket_bus: TicketBusValue & { dateEnd?: TicketBusValue["dateEnd"] };
  yacht: YachtValue & { dateEnd?: YachtValue["dateEnd"] };
  hotel: HotelValue;
  airport_transfer: AirportTransferValue;
  car_rental: CarRentalValue;
};
