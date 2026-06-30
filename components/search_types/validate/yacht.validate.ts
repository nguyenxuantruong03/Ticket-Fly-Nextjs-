import { YachtValue, ValidationError } from "../components/types";
import { addError, isEmpty } from "./utils";

const toDate = (d?: string | Date) => {
  if (isEmpty(d)) return null;

  const date = new Date(d!);
  return isNaN(date.getTime()) ? null : date;
};

export const validateYacht = (v: YachtValue): ValidationError[] => {
  const errors: ValidationError[] = [];

  const startDate = toDate(v.dateStart?.from);
  const endDate = toDate(v.dateEnd?.from ?? undefined);

  // ======================
  // FROM / TO
  // ======================
  addError(errors, isEmpty(v.from?.id), "from", "Thiếu điểm đi");
  addError(errors, isEmpty(v.to?.id), "to", "Thiếu điểm đến");

  const sameLocation =
    !isEmpty(v.from?.id) && !isEmpty(v.to?.id) && v.from.id === v.to.id;

  if (sameLocation) {
    addError(errors, true, "to", "Điểm đi và điểm đến không được giống nhau");
  }

  // ======================
  // DATE
  // ======================
  addError(
    errors,
    isEmpty(v.dateStart?.from),
    "dateStart",
    "Thiếu ngày bắt đầu",
  );

  if (!v.return_and_depart) return errors;

  addError(errors, isEmpty(v.dateEnd?.from), "dateEnd", "Thiếu ngày kết thúc");

  if (startDate && endDate) {
    const start = startDate.getTime();
    const end = endDate.getTime();

    const invalid = start >= end;

    if (invalid) {
      addError(
        errors,
        true,
        "dateEnd",
        "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      );
    }

    // min 1 day rule
    if (start < end) {
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        addError(errors, true, "dateEnd", "Thời gian thuê tối thiểu là 1 ngày");
      }
    }
  }

  // ======================
  // PASSENGER + ROOM
  // ======================
  const passenger = v.passengerandroom;

  addError(
    errors,
    isEmpty(passenger?.adult) || passenger.adult < 1,
    "passengerandroom.adult",
    "Thiếu người lớn",
  );

  addError(
    errors,
    isEmpty(passenger?.room) || passenger.room < 1,
    "passengerandroom.room",
    "Thiếu phòng",
  );

  addError(
    errors,
    isEmpty(passenger?.kid) || passenger.kid < 0,
    "passengerandroom.kid",
    "Trẻ em không được nhỏ hơn 0",
  );

  return errors;
};
