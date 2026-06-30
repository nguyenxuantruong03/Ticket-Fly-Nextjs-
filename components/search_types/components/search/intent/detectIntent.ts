import { normalize } from "../utils/text";

export type Intent =
  | "airport"
  | "city"
  | "hotel"
  | "transport"
  | "geo"
  | "mixed";

export const detectIntent = (q: string): Intent => {
  const x = normalize(q);

  if (x.length === 3 && /^[a-z]{3}$/.test(x)) return "airport";

  if (x.includes("airport") || x.includes("flight")) return "airport";

  if (x.includes("hotel") || x.includes("stay")) return "hotel";

  if (
    x.includes("bus") ||
    x.includes("train") ||
    x.includes("transfer") ||
    x.includes("car")
  ) {
    return "transport";
  }

  if (x.includes("vietnam") || x.includes("asia") || x.includes("travel")) {
    return "geo";
  }

  if (/^[a-z\s]+$/.test(x)) return "city";

  return "mixed";
};
