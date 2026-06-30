import {
  Hotel,
  Tally4,
  House,
  Building,
  Forward,
  RefreshCcw,
  Armchair,
  BedSingle,
  BedDouble,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CalendarClock,
  CalendarSync,
  ChartNoAxesGantt,
} from "lucide-react";
import {
  AirportTransferValue,
  CarRentalValue,
  HotelValue,
  TicketBusValue,
  TicketFlyValue,
  YachtValue,
} from "./components/types";

/* ================= ICONS ================= */

export const SEARCH_ICONS = {
  hotel: Hotel,
  tally: Tally4,
  house: House,
  building: Building,
  forward: Forward,
  refresh_ccw: RefreshCcw,
  armchair: Armchair,
  bed_single: BedSingle,
  bed_double: BedDouble,
  sparkles: Sparkles,
  shield_check: ShieldCheck,
  chevrons_right: ChevronRight,
  calendar_clock: CalendarClock,
  calendar_sync: CalendarSync,
  chart_no_axes_gantt: ChartNoAxesGantt,
} as const;

export type SearchIconKey = keyof typeof SEARCH_ICONS;

/* ================= FEATURE PROPS ================= */

export interface SearchFeatureProps<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

/* ================= VALUE TYPES ================= */

/* ================= SEARCH TYPE ================= */
export type SearchTypeKey =
  | "hotel"
  | "ticket_fly"
  | "ticket_bus"
  | "airport_transfer"
  | "car_rental"
  | "yacht";

/* ================= OPTION TYPE ================= */

export interface SearchOption {
  label: string;
  background: string;
  image: string;
  title: string;
  description: string;
  filter: { option: string; icon?: SearchIconKey }[];
}

/* ================= SEARCH TYPES ================= */

export const SEARCHTYPES = {
  hotel: {
    label: "Khách sạn",
    background: "/videos/hotel.mp4",
    image: "/images/flight-background.png",
    title: "Khám phá khách sạn",
    description: "Hàng ngàn lựa chọn",
    filter: [
      { icon: "tally", option: "Tất cả" },
      { icon: "hotel", option: "Khách sạn" },
      { icon: "house", option: "Biệt thự" },
      { icon: "building", option: "Căn hộ" },
    ],
  },
  ticket_fly: {
    label: "Vé máy bay",
    background: "/videos/fly.mp4",
    image: "/images/flight-background.png",
    title: "Vé máy bay",
    description: "Bay mọi nơi",
    filter: [
      { icon: "forward", option: "Một chiều" },
      { icon: "refresh_ccw", option: "Khứ hồi" },
    ],
  },
  ticket_bus: {
    label: "Xe khách",
    background: "/videos/fly.mp4",
    image: "/images/flight-background.png",
    title: "Xe khách",
    description: "Di chuyển tiện lợi",
    filter: [
      { icon: "armchair", option: "Ghế ngồi" },
      { icon: "bed_single", option: "Giường nằm" },
      { icon: "bed_double", option: "Phòng đôi" },
    ],
  },
  yacht: {
    label: "Du thuyền",
    background: "/videos/fly.mp4",
    image: "/images/background.png",
    title: "Du thuyền",
    description: "Sang trọng",
    filter: [
      { icon: "sparkles", option: "Sang chảnh" },
      { icon: "chart_no_axes_gantt", option: "Tiêu chuẩn" },
    ],
  },
  airport_transfer: {
    label: "Xe sân bay",
    background: "/videos/fly.mp4",
    image: "/images/flight-background.png",
    title: "Xe sân bay",
    description: "Nhanh chóng",
    filter: [
      { icon: "chevrons_right", option: "Nhanh" },
      { icon: "shield_check", option: "Tiết kiệm" },
    ],
  },
  car_rental: {
    label: "Thuê xe",
    background: "/videos/fly.mp4",
    image: "/images/flight-background.png",
    title: "Thuê xe",
    description: "Tự do di chuyển",
    filter: [
      { icon: "calendar_clock", option: "Theo giờ" },
      { icon: "calendar_sync", option: "Theo ngày" },
    ],
  },
} as const;

export type SearchValues = {
  airport_transfer: AirportTransferValue;
  hotel: HotelValue;
  ticket_fly: TicketFlyValue;
  ticket_bus: TicketBusValue;
  car_rental: CarRentalValue;
  yacht: YachtValue;
};

export type SearchValueOf<T extends SearchTypeKey> = SearchValues[T];
