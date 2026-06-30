"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SEARCH_ICONS, SearchTypeKey, SEARCHTYPES } from "./item";
import {
  AirportTransferValue,
  CarRentalValue,
  HotelValue,
  SearchPayloadMap,
  SearchValueMap,
  TicketBusValue,
  TicketFlyValue,
  ValidationError,
  WithReturnTrip,
  YachtValue,
} from "./components/types";
import HotelFeature from "./features/hotel";
import TicketBusFeature from "./features/ticket_bus";
import TicketFlyFeature from "./features/ticket_fly";
import YachtFeature from "./features/yacht";
import AirportTransferFeature from "./features/airport_transfer";
import CarRentalFeature from "./features/car_rental";
import { validateSearchValue } from "./validate";
import { getDefaultValue } from "./defaultValues";

interface SearchTypeProps<T extends SearchTypeKey> {
  type: T;
  isHome?: boolean;
}

const SearchType = ({
  type,
  isHome = false,
}: SearchTypeProps<SearchTypeKey>) => {
  const config = SEARCHTYPES[type];

  const [state, setState] = useState<SearchValueMap[SearchTypeKey]>(() =>
    getDefaultValue(type),
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const buildSearchPayload = <T extends SearchTypeKey>(
    type: T,
    value: SearchValueMap[T],
  ): SearchPayloadMap[T] => {
    switch (type) {
      case "ticket_fly":
      case "ticket_bus":
      case "yacht": {
        const { dateEnd, return_and_depart, ...rest } = value as WithReturnTrip;

        return {
          ...rest,
          return_and_depart,
          dateEnd: return_and_depart ? dateEnd : undefined,
        } as SearchPayloadMap[T];
      }

      default:
        return value as SearchPayloadMap[T];
    }
  };

  const showErrors = (errors: ValidationError[]) => {
    setErrors(errors);
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      setErrors([]);
      errorTimeoutRef.current = null;
    }, 3000);
  };

  const handleSubmit = () => {
    const payload = buildSearchPayload(type, state);

    const result = validateSearchValue(type, payload);

    if (result.length > 0) {
      showErrors(result);
      return;
    }

    setErrors([]);

    console.log("SEARCH:", payload);
  };

  const renderSearchComponent = () => {
    switch (type) {
      case "hotel":
        return (
          <HotelFeature
            value={state as HotelValue}
            setValue={
              setState as React.Dispatch<React.SetStateAction<HotelValue>>
            }
            errorText={errors}
          />
        );

      case "ticket_fly":
        return (
          <TicketFlyFeature
            value={state as TicketFlyValue}
            setValue={
              setState as React.Dispatch<React.SetStateAction<TicketFlyValue>>
            }
            errorText={errors}
          />
        );

      case "ticket_bus":
        return (
          <TicketBusFeature
            value={state as TicketBusValue}
            setValue={
              setState as React.Dispatch<React.SetStateAction<TicketBusValue>>
            }
            errorText={errors}
          />
        );

      case "airport_transfer":
        return (
          <AirportTransferFeature
            value={state as AirportTransferValue}
            setValue={
              setState as React.Dispatch<
                React.SetStateAction<AirportTransferValue>
              >
            }
            errorText={errors}
          />
        );

      case "car_rental":
        return (
          <CarRentalFeature
            value={state as CarRentalValue}
            setValue={
              setState as React.Dispatch<React.SetStateAction<CarRentalValue>>
            }
            errorText={errors}
          />
        );

      case "yacht":
        return (
          <YachtFeature
            value={state as YachtValue}
            setValue={
              setState as React.Dispatch<React.SetStateAction<YachtValue>>
            }
            errorText={errors}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative ${!isHome ? "lg:p-8" : ""}`}>
      {!isHome && (
        <>
          <Image
            src={config.image}
            alt=""
            width={1200}
            height={720}
            className="w-full h-[720px] object-cover lg:rounded-xl block lg:hidden"
          />

          <video
            autoPlay
            loop
            muted
            playsInline
            className="max-w-full w-full inset-0 mx-auto object-cover lg:rounded-xl hidden lg:block relative lg:h-[520px]"
            src={config.background}
          />
        </>
      )}

      <div
        className={`${
          !isHome
            ? "absolute inset-0 lg:translate-y-1/2 flex items-center justify-center z-10 px-2"
            : "absolute -top-20 left-1/2 -translate-x-1/2 translate-y-1/2 w-full px-8"
        }`}
      >
        <div
          className={`${!isHome ? "bg-white rounded-3xl p-3 lg:p-8 shadow-lg w-full max-w-5xl" : ""}`}
        >
          {!isHome && (
            <div className="text-center">
              <h1 className="font-bold text-xl lg:text-3xl">{config.title}</h1>
              <span className="text-slate-400 text-xs md:text-md">
                {config.description}
              </span>
            </div>
          )}
          <div className="border my-2 lg:my-3" />
          <div className="flex items-center space-x-2">
            {config.filter.map((f, i) => {
              const IconComp = f.icon ? SEARCH_ICONS[f.icon] : null;

              return (
                <div
                  key={i}
                  className="bg-black text-white px-2 lg:px-3 py-1 rounded-full flex items-center gap-1 text-xs lg:text-md"
                >
                  {IconComp && <IconComp className="w-3 h-3 lg:w-4 lg:h-4" />}
                  <span>{f.option}</span>
                </div>
              );
            })}
          </div>
          <div>
            <div className="lg:flex justify-between items-center grid grid-cols-1 lg:space-x-3 gap-5 lg:gap-0">
              <div className="flex-1 my-3">
                <div className="">{renderSearchComponent()}</div>
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="secondary"
                className="bg-custom-root hover:bg-custom-darkroot h-12 text-black hover:text-white lg:mt-12"
              >
                <Search /> <span className="text-lg lg:hidden">Tìm kiếm</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchType;
