import {
  Bus,
  FlagTriangleRight,
  KeySquare,
  MapPin,
  PlaneLanding,
  PlaneTakeoff,
} from "lucide-react";

export const icons = {
  "map-pin": MapPin,

  "plane-takeoff": PlaneTakeoff,

  "plane-landing": PlaneLanding,

  bus: Bus,

  busback: Bus,

  "key-square": KeySquare,

  "flag-triangle-right": FlagTriangleRight,
};

export type IconComponent = keyof typeof icons;
