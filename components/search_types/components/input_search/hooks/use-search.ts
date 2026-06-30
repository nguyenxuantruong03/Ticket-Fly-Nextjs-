import { useEffect, useMemo, useState } from "react";
import { injectAirportsForCities } from "./airportInjector";
import {
  BusNode,
  CarRentalNode,
  CityNode,
  HotelNode,
  YachtNode,
  SearchIndexItem,
  AirportNode,
  SearchItem,
} from "../../types";

import { buildSearchData } from "../../search/engine/buildSearchData";
import { groupAirportsByCity } from "./groupAirportsByCity";

interface Props {
  cityData?: CityNode[];
  airportsData?: AirportNode[];
  hotelData?: HotelNode[];
  busData?: BusNode[];
  carRentalData?: CarRentalNode[];
  yachtData?: YachtNode[];

  // FIX
  value?: string | SearchItem | undefined;
}

/**
 * Lấy text để search
 */
const getSearchValue = (value: string | SearchItem | undefined) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value.name ?? "";
};

const buildIndex = (
  cityData: CityNode[],
  airportsData: AirportNode[],
  hotelData: HotelNode[],
  busData: BusNode[],
  carRentalData: CarRentalNode[],
  yachtData: YachtNode[],
  hotelCountMap: Record<string, number>,
): SearchIndexItem[] => {
  return [
    ...cityData.map((c) => ({
      type: "city" as const,
      id: c.id,
      name: c.name,
      aliases: c.aliases,
      searchText: [c.name, ...(c.aliases ?? [])].join(" "),
      cityId: c.cityId,
      hotelCount: hotelCountMap[c.id] || 0,
      scoreBoost: c.searchWeight ?? 0,
      raw: c,
    })),

    ...airportsData.map((a) => ({
      type: "airport" as const,
      id: a.id,
      name: a.name,
      aliases: a.aliases,
      searchText: [a.name, ...(a.aliases ?? [])].join(" "),
      cityId: a.cityId,
      scoreBoost: a.searchWeight ?? 0,
      raw: a,
    })),

    ...hotelData.map((h) => ({
      type: "hotel" as const,
      id: h.id,
      name: h.name,
      aliases: h.aliases,
      searchText: [h.name, ...(h.aliases ?? [])].join(" "),
      cityId: h.cityId,
      scoreBoost: h.searchWeight ?? 0,
      raw: h,
    })),

    ...busData.map((b) => ({
      type: "bus" as const,
      id: b.id,
      name: b.name,
      aliases: b.aliases,
      searchText: [b.name, ...(b.aliases ?? [])].join(" "),
      cityId: b.cityId,
      scoreBoost: b.searchWeight ?? 0,
      raw: b,
    })),

    ...carRentalData.map((c) => ({
      type: "car_rental" as const,
      id: c.id,
      name: c.name,
      aliases: c.aliases,
      searchText: [c.name, ...(c.aliases ?? [])].join(" "),
      scoreBoost: c.searchWeight ?? 0,
      raw: c,
    })),

    ...yachtData.map((y) => ({
      type: "yacht" as const,
      id: y.id,
      name: y.name,
      aliases: y.aliases,
      searchText: [y.name, ...(y.aliases ?? [])].join(" "),
      cityId: y.cityId,
      scoreBoost: y.searchWeight ?? 0,
      raw: y,
    })),
  ];
};

export function useSearch({
  cityData = [],
  airportsData = [],
  hotelData = [],
  busData = [],
  carRentalData = [],
  yachtData = [],
  value,
}: Props) {
  const [debouncedValue, setDebouncedValue] = useState("");

  /**
   * FIX:
   * object -> name
   */
  useEffect(() => {
    const text = getSearchValue(value);

    const t = setTimeout(() => {
      setDebouncedValue(text);
    }, 120);

    return () => clearTimeout(t);
  }, [value]);

  const hotelCountMap = useMemo(() => {
    return hotelData.reduce<Record<string, number>>((acc, h) => {
      if (!h.cityId) return acc;

      acc[h.cityId] = (acc[h.cityId] || 0) + 1;

      return acc;
    }, {});
  }, [hotelData]);

  const index = useMemo(() => {
    return buildIndex(
      cityData,
      airportsData,
      hotelData,
      busData,
      carRentalData,
      yachtData,
      hotelCountMap,
    );
  }, [
    cityData,
    airportsData,
    hotelData,
    busData,
    carRentalData,
    yachtData,
    hotelCountMap,
  ]);

  const results = useMemo(() => {
    return buildSearchData(index, debouncedValue.trim());
  }, [index, debouncedValue]);

  const airportMap = useMemo(() => {
    const map = new Map<string, SearchIndexItem[]>();

    for (const item of index) {
      if (item.type !== "airport") continue;
      if (!item.cityId) continue;

      if (!map.has(item.cityId)) {
        map.set(item.cityId, []);
      }

      map.get(item.cityId)!.push(item);
    }

    return map;
  }, [index]);

  const groupedResults = useMemo(() => {
    const query = debouncedValue.trim();

    if (!query) {
      const base = [
        ...index.filter((i) => i.type === "city"),
        ...index.filter((i) => i.type === "airport").slice(0, 10),
        ...index.filter((i) => i.type === "hotel").slice(0, 10),
        ...index.filter((i) => i.type === "bus").slice(0, 10),
        ...index.filter((i) => i.type === "car_rental").slice(0, 10),
        ...index.filter((i) => i.type === "yacht").slice(0, 10),
      ];

      const enriched = injectAirportsForCities(base, airportMap);

      return groupAirportsByCity(enriched);
    }

    const base = results.map((r) => r.item);

    const enriched = injectAirportsForCities(base, airportMap);

    return groupAirportsByCity(enriched);
  }, [results, index, debouncedValue, airportMap]);

  return {
    safeResults: groupedResults,

    debouncedValue,
  };
}
