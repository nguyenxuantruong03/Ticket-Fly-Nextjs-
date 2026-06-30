import { CarRentalValue, ValidationError } from "../components/types";
import { addError, isEmpty } from "./utils";

const toDate = (d?: string | Date) => {
  if (isEmpty(d)) return null;

  const date = new Date(d!);
  return isNaN(date.getTime()) ? null : date;
};

export const validateCarRental = (v: CarRentalValue): ValidationError[] => {
  const errors: ValidationError[] = [];

  const startDate = toDate(v.dateStart?.from);
  const endDate = toDate(v.dateEnd?.from);

  // ======================
  // BASIC FIELDS
  // ======================
  addError(errors, isEmpty(v.place?.name), "place", "Thiếu địa điểm thuê");

  addError(
    errors,
    isEmpty(v.dateStart?.from),
    "dateStart",
    "Thiếu ngày bắt đầu",
  );

  addError(errors, isEmpty(v.dateEnd?.from), "dateEnd", "Thiếu ngày kết thúc");

  // ======================
  // DATE LOGIC
  // ======================
  if (startDate && endDate) {
    const start = startDate.getTime();
    const end = endDate.getTime();

    const invalidRange = start >= end;

    if (invalidRange) {
      addError(
        errors,
        true,
        "dateStart",
        "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
      );

      addError(
        errors,
        true,
        "dateEnd",
        "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      );
    } else {
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        addError(errors, true, "dateEnd", "Thời gian thuê tối thiểu là 1 ngày");
      }
    }
  }

  // ======================
  // TIME
  // ======================
  addError(errors, isEmpty(v.timeStart), "timeStart", "Thiếu giờ bắt đầu");

  addError(errors, isEmpty(v.timeEnd), "timeEnd", "Thiếu giờ kết thúc");

  return errors;
};
