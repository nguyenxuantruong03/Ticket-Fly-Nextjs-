/* ======================================================
   1. CITY (SOURCE OF TRUTH)
====================================================== */
export const addressData: AddressNode[] = [
  {
    id: "addr_001",
    name: "Ben Thanh Market",
    street: "Le Loi Street",
    district: "District 1",
    ward: "Ben Thanh Ward",
    houseNumber: "1",
    lat: 10.7721,
    lng: 106.6983,
    precision: "address",
  },
  {
    id: "addr_002",
    name: "Independence Palace",
    street: "Nam Ky Khoi Nghia Street",
    district: "District 1",
    ward: "Ben Thanh Ward",
    houseNumber: "135",
    lat: 10.777,
    lng: 106.6953,
    precision: "address",
  },
  {
    id: "addr_003",
    name: "Saigon Central Post Office",
    street: "Cong Xa Paris Street",
    district: "District 1",
    ward: "Ben Nghe Ward",
    houseNumber: "2",
    lat: 10.7798,
    lng: 106.699,
    precision: "point",
  },
  {
    id: "addr_004",
    name: "Nguyen Hue Walking Street",
    street: "Nguyen Hue Street",
    district: "District 1",
    ward: "Ben Nghe Ward",
    lat: 10.7741,
    lng: 106.7036,
    precision: "street",
  },
  {
    id: "addr_005",
    name: "Landmark 81",
    street: "Nguyen Huu Canh Street",
    district: "Binh Thanh District",
    ward: "22 Ward",
    houseNumber: "720A",
    lat: 10.7951,
    lng: 106.7218,
    precision: "address",
  },
  {
    id: "addr_006",
    name: "Tan Son Nhat Airport",
    street: "Truong Son Street",
    district: "Tan Binh District",
    ward: "2 Ward",
    houseNumber: "1",
    lat: 10.8188,
    lng: 106.6519,
    precision: "point",
  },
  {
    id: "addr_007",
    name: "Pham Ngu Lao Street",
    street: "Pham Ngu Lao Street",
    district: "District 1",
    ward: "Pham Ngu Lao Ward",
    lat: 10.7679,
    lng: 106.693,
    precision: "street",
  },
  {
    id: "addr_008",
    name: "Vinhomes Central Park",
    street: "Nguyen Huu Canh Street",
    district: "Binh Thanh District",
    ward: "22 Ward",
    houseNumber: "208",
    lat: 10.7945,
    lng: 106.7217,
    precision: "address",
  },
  {
    id: "addr_009",
    name: "Bitexco Financial Tower",
    street: "Hai Trieu Street",
    district: "District 1",
    ward: "Ben Nghe Ward",
    houseNumber: "2",
    lat: 10.7717,
    lng: 106.704,
    precision: "address",
  },
  {
    id: "addr_010",
    name: "War Remnants Museum",
    street: "Vo Van Tan Street",
    district: "District 3",
    ward: "Vo Thi Sau Ward",
    houseNumber: "28",
    lat: 10.7797,
    lng: 106.6921,
    precision: "address",
  },
  {
    id: "addr_011",
    name: "Dam Sen Park",
    street: "Hoa Binh Street",
    district: "District 11",
    ward: "3 Ward",
    houseNumber: "3",
    lat: 10.7661,
    lng: 106.6355,
    precision: "address",
  },
  {
    id: "addr_012",
    name: "AEON Mall Tan Phu",
    street: "Celadon City",
    district: "Tan Phu District",
    ward: "Son Ky Ward",
    houseNumber: "30",
    lat: 10.8017,
    lng: 106.6185,
    precision: "address",
  },
  {
    id: "addr_013",
    name: "Ho Chi Minh City Opera House",
    street: "Dong Khoi Street",
    district: "District 1",
    ward: "Ben Nghe Ward",
    houseNumber: "7",
    lat: 10.7769,
    lng: 106.7031,
    precision: "address",
  },
  {
    id: "addr_014",
    name: "Tao Dan Park",
    street: "Nguyen Thi Minh Khai Street",
    district: "District 1",
    ward: "Ben Thanh Ward",
    lat: 10.7728,
    lng: 106.6912,
    precision: "point",
  },
  {
    id: "addr_015",
    name: "Suoi Tien Theme Park",
    street: "Xa Lo Ha Noi",
    district: "Thu Duc City",
    ward: "Tan Phu Ward",
    houseNumber: "120",
    lat: 10.8673,
    lng: 106.8033,
    precision: "address",
  },
  {
    id: "addr_016",
    name: "Crescent Mall",
    street: "Ton Dat Tien Street",
    district: "District 7",
    ward: "Tan Phu Ward",
    houseNumber: "101",
    lat: 10.7298,
    lng: 106.7195,
    precision: "address",
  },
  {
    id: "addr_017",
    name: "Pham Van Dong Street",
    street: "Pham Van Dong Street",
    district: "Thu Duc City",
    ward: "Hiep Binh Chanh Ward",
    lat: 10.836,
    lng: 106.726,
    precision: "street",
  },
  {
    id: "addr_018",
    name: "Bach Dang Wharf",
    street: "Ton Duc Thang Street",
    district: "District 1",
    ward: "Ben Nghe Ward",
    lat: 10.7697,
    lng: 106.7065,
    precision: "point",
  },
  {
    id: "addr_019",
    name: "Hoang Van Thu Park",
    street: "Hoang Van Thu Street",
    district: "Tan Binh District",
    ward: "2 Ward",
    lat: 10.7992,
    lng: 106.665,
    precision: "point",
  },
  {
    id: "addr_020",
    name: "Saigon River Tunnel",
    street: "Mai Chi Tho Street",
    district: "Thu Duc City",
    ward: "An Khanh Ward",
    lat: 10.7675,
    lng: 106.7178,
    precision: "point",
  },
];

import {
  AddressNode,
  AirportNode,
  BusNode,
  CarRentalNode,
  CityNode,
  HotelNode,
  YachtNode,
} from "./components/types";

export const citiesData: CityNode[] = [
  {
    id: "city_hcm",
    type: "city",
    cityId: "HCM",
    name: "Ho Chi Minh City",
    subtitle: "Economic center",
    country: "Vietnam",
    province: "Ho Chi Minh",
    lat: 10.7769,
    lng: 106.7009,
    aliases: ["Saigon", "Ho Chi Minh", "HCMC"],
    searchWeight: 10,
    popularityScore: 98,
    priority: 1,
    airportIds: ["airport_sgn", "airport_sgn_old"],
  },

  {
    id: "city_han",
    type: "city",
    cityId: "HAN",
    name: "Hanoi",
    subtitle: "Capital city",
    country: "Vietnam",
    province: "Hanoi",
    lat: 21.0278,
    lng: 105.8342,
    aliases: ["Ha Noi"],
    searchWeight: 9,
    popularityScore: 96,
    priority: 1,
    airportIds: ["airport_han"],
  },

  {
    id: "city_dad",
    type: "city",
    cityId: "DAD",
    name: "Da Nang",
    subtitle: "Beach city",
    country: "Vietnam",
    province: "Da Nang",
    lat: 16.0544,
    lng: 108.2022,
    aliases: ["Danang"],
    searchWeight: 8,
    popularityScore: 92,
    priority: 2,
    airportIds: ["airport_dad"],
  },

  {
    id: "city_nhatrang",
    type: "city",
    cityId: "CXR",
    name: "Nha Trang",
    subtitle: "Coastal resort city",
    country: "Vietnam",
    province: "Khanh Hoa",
    lat: 12.2388,
    lng: 109.1967,
    aliases: ["Cam Ranh", "Nha Trang Bay"],
    searchWeight: 7,
    popularityScore: 88,
    priority: 3,
    airportIds: ["airport_cxr"],
  },

  {
    id: "city_phuquoc",
    type: "city",
    cityId: "PQC",
    name: "Phu Quoc",
    subtitle: "Island paradise",
    country: "Vietnam",
    province: "Kien Giang",
    lat: 10.2899,
    lng: 103.984,
    aliases: ["Phu Quoc Island"],
    searchWeight: 7,
    popularityScore: 89,
    priority: 3,
    airportIds: ["airport_pqc"],
  },

  {
    id: "city_cantho",
    type: "city",
    cityId: "VCA",
    name: "Can Tho",
    subtitle: "Mekong Delta hub",
    country: "Vietnam",
    province: "Can Tho",
    lat: 10.0452,
    lng: 105.7469,
    aliases: ["Cần Thơ"],
    searchWeight: 6,
    popularityScore: 85,
    priority: 3,
    airportIds: ["airport_vca"],
  },

  {
    id: "city_vinh",
    type: "city",
    cityId: "VII",
    name: "Vinh",
    subtitle: "Central Vietnam city",
    country: "Vietnam",
    province: "Nghe An",
    lat: 18.6796,
    lng: 105.6813,
    aliases: ["Vinh City"],
    searchWeight: 5,
    popularityScore: 78,
    priority: 4,
    airportIds: ["airport_vii"],
  },

  {
    id: "city_thanhhoa",
    type: "city",
    cityId: "THD",
    name: "Thanh Hoa",
    subtitle: "Northern central city",
    country: "Vietnam",
    province: "Thanh Hoa",
    lat: 19.8067,
    lng: 105.7852,
    aliases: ["Tho Xuan"],
    searchWeight: 5,
    popularityScore: 76,
    priority: 4,
    airportIds: ["airport_thanhhoa"],
  },
];

/* ======================================================
   2. AIRPORT (RELATIONSHIP → CITY)
====================================================== */

export const airportsData: AirportNode[] = [
  {
    id: "airport_sgn",
    type: "airport",
    airportId: "SGN",
    code: "SGN",
    name: "Tan Son Nhat International Airport",
    country: "Vietnam",
    province: "Ho Chi Minh",
    lat: 10.8188,
    lng: 106.652,
    aliases: [
      "Tan Son Nhat",
      "Ho Chi Minh Airport",
      "Saigon Airport",
      "SGN Airport",
    ],
    searchWeight: 10,
    cityId: "city_hcm",
    priority: 1,
  },

  {
    id: "airport_sgn_old",
    type: "airport",
    airportId: "SGN_OLD",
    code: "SGN2",
    name: "Old Tan Son Nhat Airport",
    country: "Vietnam",
    province: "Ho Chi Minh",
    lat: 10.817,
    lng: 106.65,
    aliases: ["Tan Son", "Nhat Airport", "Saigon International"],
    searchWeight: 7,
    cityId: "city_hcm",
    priority: 2,
  },

  {
    id: "airport_han",
    type: "airport",
    airportId: "HAN",
    code: "HAN",
    name: "Noi Bai International Airport",
    country: "Vietnam",
    province: "Hanoi",
    lat: 21.2187,
    lng: 105.8048,
    aliases: ["Hanoi Airport", "Noi Bai"],
    searchWeight: 9,
    cityId: "city_han",
    priority: 1,
  },

  {
    id: "airport_dad",
    type: "airport",
    airportId: "DAD",
    code: "DAD",
    name: "Da Nang International Airport",
    country: "Vietnam",
    province: "Da Nang",
    lat: 16.0439,
    lng: 108.199,
    aliases: ["Da Nang Airport", "DAD Airport"],
    searchWeight: 8,
    cityId: "city_dad",
    priority: 2,
  },

  {
    id: "airport_cxr",
    type: "airport",
    airportId: "CXR",
    code: "CXR",
    name: "Cam Ranh International Airport",
    country: "Vietnam",
    province: "Khanh Hoa",
    lat: 11.9982,
    lng: 109.219,
    aliases: ["Nha Trang Airport", "Cam Ranh Airport"],
    searchWeight: 7,
    cityId: "city_nhatrang",
    priority: 3,
  },

  {
    id: "airport_pqc",
    type: "airport",
    airportId: "PQC",
    code: "PQC",
    name: "Phu Quoc International Airport",
    country: "Vietnam",
    province: "Kien Giang",
    lat: 10.1698,
    lng: 103.9931,
    aliases: ["Phu Quoc Airport", "PQC Airport"],
    searchWeight: 7,
    cityId: "city_phuquoc",
    priority: 3,
  },

  {
    id: "airport_vca",
    type: "airport",
    airportId: "VCA",
    code: "VCA",
    name: "Can Tho International Airport",
    country: "Vietnam",
    province: "Can Tho",
    lat: 10.0851,
    lng: 105.7119,
    aliases: ["Can Tho Airport"],
    searchWeight: 6,
    cityId: "city_cantho",
    priority: 3,
  },

  {
    id: "airport_vii",
    type: "airport",
    airportId: "VII",
    code: "VII",
    name: "Vinh International Airport",
    country: "Vietnam",
    province: "Nghe An",
    lat: 18.7376,
    lng: 105.6708,
    aliases: ["Vinh Airport"],
    searchWeight: 5,
    cityId: "city_vinh",
    priority: 4,
  },

  {
    id: "airport_thanhhoa",
    type: "airport",
    airportId: "THD",
    code: "THD",
    name: "Tho Xuan Airport",
    country: "Vietnam",
    province: "Thanh Hoa",
    lat: 19.9017,
    lng: 105.4678,
    aliases: ["Thanh Hoa Airport", "Tho Xuan"],
    searchWeight: 5,
    cityId: "city_thanhhoa",
    priority: 4,
  },
];

/* ======================================================
   3. HOTEL (RELATIONSHIP → CITY)
====================================================== */

export const hotelsData: HotelNode[] = [
  {
    id: "hotel_001",
    type: "hotel",
    hotelId: "HOTEL_001",

    cityId: "city_hcm",

    addressId: "addr_001",

    address: {
      id: "addr_001",
      name: "Ben Thanh Market",
      street: "Le Loi Street",
      district: "District 1",
      ward: "Ben Thanh Ward",
      houseNumber: "1",
      lat: 10.7721,
      lng: 106.6983,
      precision: "address",
    },

    name: "Ben Thanh Luxury Hotel",
    country: "Vietnam",
    province: "Ho Chi Minh City",
    lat: 10.7721,
    lng: 106.6983,
    aliases: ["Ben Thanh Hotel"],
    searchWeight: 10,
  },

  {
    id: "hotel_002",
    type: "hotel",
    hotelId: "HOTEL_002",

    cityId: "city_hcm",

    addressId: "addr_002",

    address: {
      id: "addr_002",
      name: "Independence Palace",
      street: "Nam Ky Khoi Nghia Street",
      district: "District 1",
      ward: "Ben Thanh Ward",
      houseNumber: "135",
      lat: 10.777,
      lng: 106.6953,
      precision: "address",
    },

    name: "Independence Palace Suites",
    country: "Vietnam",
    province: "Ho Chi Minh City",
    lat: 10.777,
    lng: 106.6953,
    aliases: [],
    searchWeight: 9,
  },

  {
    id: "hotel_003",
    type: "hotel",
    hotelId: "HOTEL_003",

    cityId: "city_hcm",

    addressId: "addr_003",

    address: {
      id: "addr_003",
      name: "Saigon Central Post Office",
      street: "Cong Xa Paris Street",
      district: "District 1",
      ward: "Ben Nghe Ward",
      houseNumber: "2",
      lat: 10.7798,
      lng: 106.699,
      precision: "point",
    },

    name: "Central Post Hotel",
    country: "Vietnam",
    province: "Ho Chi Minh City",
    lat: 10.7798,
    lng: 106.699,
    aliases: [],
    searchWeight: 9,
  },

  {
    id: "hotel_004",
    type: "hotel",
    hotelId: "HOTEL_004",

    cityId: "city_hcm",

    addressId: "addr_004",

    address: {
      id: "addr_004",
      name: "Nguyen Hue Walking Street",
      street: "Nguyen Hue Street",
      district: "District 1",
      ward: "Ben Nghe Ward",
      lat: 10.7741,
      lng: 106.7036,
      precision: "street",
    },

    name: "Nguyen Hue Boutique Hotel",
    country: "Vietnam",
    province: "Ho Chi Minh City",
    lat: 10.7741,
    lng: 106.7036,
    aliases: [],
    searchWeight: 8,
  },

  {
    id: "hotel_005",
    type: "hotel",
    hotelId: "HOTEL_005",

    cityId: "city_hcm",

    addressId: "addr_005",

    address: {
      id: "addr_005",
      name: "Landmark 81",
      street: "Nguyen Huu Canh Street",
      district: "Binh Thanh District",
      ward: "22 Ward",
      houseNumber: "720A",
      lat: 10.7951,
      lng: 106.7218,
      precision: "address",
    },

    name: "Landmark Sky Hotel",
    country: "Vietnam",
    province: "Ho Chi Minh City",
    lat: 10.7951,
    lng: 106.7218,
    aliases: [],
    searchWeight: 10,
  },
];
/* ======================================================
   4. BUS (RELATIONSHIP → CITY)
====================================================== */

export const busesData: BusNode[] = [
  {
    id: "bus_hcm",
    type: "bus",
    busId: "HCM_BUS",
    name: "Ho Chi Minh Bus Station",
    country: "Vietnam",
    province: "Ho Chi Minh",
    lat: 10.8069,
    lng: 106.7109,
    aliases: [],
    searchWeight: 10,
    cityId: "city_hcm",
  },
  {
    id: "bus_han",
    type: "bus",
    busId: "HAN_BUS",
    name: "Hanoi Bus Station",
    country: "Vietnam",
    province: "Hanoi",
    lat: 21.0378,
    lng: 105.8442,
    aliases: [],
    searchWeight: 9,
    cityId: "city_han",
  },
  {
    id: "bus_dad",
    type: "bus",
    busId: "DAD_BUS",
    name: "Da Nang Bus Station",
    country: "Vietnam",
    province: "Da Nang",
    lat: 16.0644,
    lng: 108.2122,
    aliases: [],
    searchWeight: 8,
    cityId: "city_dad",
  },
];

/* ======================================================
   6. CAR RENTAL (RELATIONSHIP → CITY)
====================================================== */

export const carRentalsData: CarRentalNode[] = [
  {
    id: "car_hcm",
    type: "car_rental",

    rentalId: "HCM_CAR",
    provider: "AutoGo",

    addressId: "addr_006",

    address: {
      id: "addr_006",
      name: "Tan Son Nhat Airport",
      street: "Truong Son Street",
      district: "Tan Binh District",
      ward: "2 Ward",
      houseNumber: "1",
      lat: 10.8188,
      lng: 106.6519,
      precision: "point",
    },

    name: "HCM Car Rental",

    country: "Vietnam",
    province: "Ho Chi Minh City",

    lat: 10.8188,
    lng: 106.6519,

    searchWeight: 10,

    aliases: ["Saigon Car Rental", "Tan Son Nhat Car Rental"],
  },

  {
    id: "car_han",
    type: "car_rental",

    rentalId: "HAN_CAR",
    provider: "AutoGo",

    addressId: "addr_021",

    address: {
      id: "addr_021",
      name: "Noi Bai International Airport",
      street: "Vo Nguyen Giap Street",
      district: "Soc Son District",
      ward: "Phu Minh Ward",
      houseNumber: "1",
      lat: 21.2212,
      lng: 105.8072,
      precision: "point",
    },

    name: "HAN Car Rental",

    country: "Vietnam",
    province: "Hanoi",

    lat: 21.2212,
    lng: 105.8072,

    searchWeight: 9,

    aliases: ["Hanoi Car Rental", "Noi Bai Car Rental"],
  },

  {
    id: "car_dad",
    type: "car_rental",

    rentalId: "DAD_CAR",
    provider: "AutoGo",

    addressId: "addr_022",

    address: {
      id: "addr_022",
      name: "Da Nang International Airport",
      street: "Nguyen Van Linh Street",
      district: "Hai Chau District",
      ward: "Hoa Thuan Tay Ward",
      houseNumber: "58",
      lat: 16.0439,
      lng: 108.1994,
      precision: "point",
    },

    name: "DAD Car Rental",

    country: "Vietnam",
    province: "Da Nang",

    lat: 16.0439,
    lng: 108.1994,

    searchWeight: 8,

    aliases: ["Da Nang Car Rental"],
  },
];

/* ======================================================
   7. YACHT (RELATIONSHIP → CITY)
====================================================== */

export const yachtsData: YachtNode[] = [
  {
    id: "yacht_hcm",
    type: "yacht",

    yachtId: "HCM_YACHT",
    provider: "SeaLux",

    cityId: "city_hcm",

    addressId: "addr_018",

    address: {
      id: "addr_018",
      name: "Bach Dang Wharf",
      street: "Ton Duc Thang Street",
      district: "District 1",
      ward: "Ben Nghe Ward",
      lat: 10.7697,
      lng: 106.7065,
      precision: "point",
    },

    name: "HCM Yacht Experience",

    country: "Vietnam",
    province: "Ho Chi Minh City",

    lat: 10.7697,
    lng: 106.7065,

    aliases: ["Saigon Yacht", "Bach Dang Yacht"],

    searchWeight: 8,
  },

  {
    id: "yacht_han",
    type: "yacht",

    yachtId: "HAN_YACHT",
    provider: "SeaLux",

    cityId: "city_han",

    addressId: "addr_023",

    address: {
      id: "addr_023",
      name: "West Lake Hanoi",
      street: "Thanh Nien Street",
      district: "Tay Ho District",
      ward: "Yen Phu Ward",
      lat: 21.0478,
      lng: 105.8642,
      precision: "point",
    },

    name: "Hanoi Lake Yacht",

    country: "Vietnam",
    province: "Hanoi",

    lat: 21.0478,
    lng: 105.8642,

    aliases: ["West Lake Yacht"],

    searchWeight: 8,
  },

  {
    id: "yacht_dad",
    type: "yacht",

    yachtId: "DAD_YACHT",
    provider: "SeaLux",

    cityId: "city_dad",

    addressId: "addr_024",

    address: {
      id: "addr_024",
      name: "Han River Da Nang",
      street: "Bach Dang Street",
      district: "Hai Chau District",
      ward: "Hai Chau Ward",
      lat: 16.0844,
      lng: 108.2322,
      precision: "point",
    },

    name: "Da Nang Party Yacht",

    country: "Vietnam",
    province: "Da Nang",

    lat: 16.0844,
    lng: 108.2322,

    aliases: ["Da Nang River Yacht"],

    searchWeight: 8,
  },
];
