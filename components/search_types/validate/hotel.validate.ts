import { HotelValue, ValidationError } from "../components/types";
import { addError } from "./utils";

const toDate = (d?: string | Date) => {
  if (!d) return null;
  const date = new Date(d);
  return isNaN(date.getTime()) ? null : date;
};

export const validateHotel = (v: HotelValue): ValidationError[] => {
  const errors: ValidationError[] = [];

  const fromDate = toDate(v.time?.from);
  const toDateValue = toDate(v.time?.to);

  // ======================
  // BASIC FIELDS
  // ======================
  addError(errors, !v.destination?.name, "destination", "Thiếu điểm đến");
  addError(errors, !v.time?.from, "time.from", "Thiếu check-in");
  addError(errors, !v.time?.to, "time.to", "Thiếu check-out");
  addError(
    errors,
    !v.passengerandroom.adult || v.passengerandroom.adult < 1,
    "passengerandroom.adult",
    "Thiếu người lớn",
  );
  addError(
    errors,
    !v.passengerandroom.room || v.passengerandroom.room < 1,
    "passengerandroom.room",
    "Thiếu phòng",
  );
  addError(
    errors,
    v.passengerandroom.kid == null || v.passengerandroom.kid < 0,
    "passengerandroom.kid",
    "Trẻ em không được nhỏ hơn 0",
  );

  // ======================
  // DATE LOGIC
  // ======================
  if (fromDate && toDateValue) {
    const from = fromDate.getTime();
    const to = toDateValue.getTime();

    const invalid = from >= to; // start > end OR same day

    if (invalid) {
      // 🔥 check-out message
      addError(errors, true, "time.to", "Check-out phải lớn hơn check-in");
    } else {
      // optional rule: at least 1 night
      const diffDays = (to - from) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        addError(
          errors,
          true,
          "time.to",
          "Thời gian lưu trú tối thiểu là 1 đêm",
        );
      }
    }
  }

  return errors;
};
