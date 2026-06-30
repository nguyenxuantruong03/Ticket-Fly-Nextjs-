import { SearchIndexItem } from "../../types";

/**
 * Ensure: nếu city appear → always include its airports
 */
export const injectAirportsForCities = (
  items: SearchIndexItem[],
  airportMap: Map<string, SearchIndexItem[]>,
) => {
  const cityIds = new Set<string>();
  const result = [...items];

  // collect city ids
  for (const item of items) {
    if (item.type === "city") {
      cityIds.add(item.id.toString());
    }
  }

  // inject airports
  for (const cityId of cityIds) {
    const airports = airportMap.get(cityId);
    if (!airports?.length) continue;

    for (const airport of airports) {
      // avoid duplicates
      if (!result.find((r) => r.id === airport.id && r.type === "airport")) {
        result.push(airport);
      }
    }
  }

  return result;
};
