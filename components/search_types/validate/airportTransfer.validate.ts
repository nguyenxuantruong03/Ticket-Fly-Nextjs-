import { AirportTransferValue, ValidationError } from "../components/types";
import { addError } from "./utils";

const isEmpty = (v: unknown) => v === "" || v === undefined || v === null;

export const validateAirportTransfer = (
  v: AirportTransferValue,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // ======================
  // FROM / TO
  // ======================
  addError(errors, isEmpty(v.from?.id), "from", "Thiếu điểm đi");
  addError(errors, isEmpty(v.to?.id), "to", "Thiếu điểm đến");

  const sameLocation =
    !isEmpty(v.from?.id) && !isEmpty(v.to?.id) && v.from?.id === v.to?.id;

  if (sameLocation) {
    addError(errors, true, "to", "Điểm đi và điểm đến không được giống nhau");
  }

  // ======================
  // ARRIVAL DATE / TIME
  // ======================
  addError(errors, isEmpty(v.arrivalDay?.from), "arrivalDay", "Thiếu ngày đến");

  addError(errors, isEmpty(v.arrivalHour), "arrivalHour", "Thiếu giờ đến");

  return errors;
};
