import { SearchIndexItem, GroupedSearchResult } from "../../types";

/**
 * Group airports under city while keeping SearchIndexItem intact
 */
export function groupAirportsByCity(items: SearchIndexItem[]) {
  const airportByCity = new Map<string, SearchIndexItem[]>();
  const nonAirportItems: SearchIndexItem[] = [];

  /** 1. collect airports */
  for (const item of items) {
    if (item.type === "airport") {
      const cityId = item.cityId;
      if (!cityId) continue;

      if (!airportByCity.has(cityId)) {
        airportByCity.set(cityId, []);
      }

      airportByCity.get(cityId)!.push(item);
      continue;
    }

    nonAirportItems.push(item);
  }

  /** 2. build grouped output */
  const final: GroupedSearchResult[] = [];

  for (const item of nonAirportItems) {
    if (item.type === "city") {
      const cityId = item.id.toString();
      const airports = airportByCity.get(cityId) || [];

      final.push({
        type: "city_group",
        city: item,
        airports,
      });

      continue;
    }

    final.push(item);
  }

  return final;
}
