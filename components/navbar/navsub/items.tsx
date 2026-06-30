import { Bus, CarTaxiFront, Hotel, Key, Plane, Ship } from "lucide-react";

// Tách biệt dữ liệu cấu hình
export const NAVSUB_ITEMS = [
  {
    icon: <Hotel className="h-6 w-6" />,
    label: "Hotel",
    link: "/hotel",
    type: "hotel",
    isShow: true,
    background: "bg-red-500",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    label: "Ticket Fly",
    link: "/ticket_fly",
    isShow: true,
    type: "ticket_fly",
    background: "bg-green-500",
  },
  {
    icon: <Bus className="h-6 w-6" />,
    label: "Ticket Bus",
    link: "/ticket_bus",
    isShow: true,
    type: "ticket_bus",
    background: "bg-blue-700",
  },
  {
    icon: <Ship className="h-6 w-6" />,
    label: "Yacht",
    link: "/yacht",
    isShow: true,
    type: "yacht",
    background: "bg-yellow-500",
  },
  {
    id: 5,
    icon: <CarTaxiFront className="h-6 w-6" />,
    label: "Đưa đón ra sân bay",
    link: "/airport_transfer",
    isShow: false,
    type: "airport_transfer",
    background: "bg-violet-500",
  },
  {
    icon: <Key className="h-6 w-6" />,
    label: "Cho thuê xe",
    link: "/car_rental",
    isShow: false,
    type: "car_rental",
    background: "bg-teal-500",
  },
];
export const NAVSUBDROPDOWNMORE_ITEMS = [
  {
    icon: <CarTaxiFront className="h-6 w-6" />,
    label: "Đưa đón ra sân bay",
    link: "/airport_transfer",
    type: "airport_transfer",
  },
  {
    icon: <Key className="h-6 w-6" />,
    label: "Cho thuê xe",
    link: "/car_rental",
    type: "car_rental",
  },
];
