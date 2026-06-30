import { TicketFlyValue, ValidationError } from "../components/types";
import { addError, isEmpty } from "./utils";

const toDate = (d?: string | Date) => {
  if (isEmpty(d)) return null;

  const date = new Date(d!);
  return isNaN(date.getTime()) ? null : date;
};

export const validateTicketFly = (v: TicketFlyValue): ValidationError[] => {
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
  addError(errors, isEmpty(v.dateStart?.from), "dateStart", "Thiếu ngày đi");

  if (!v.return_and_depart) {
    return errors;
  }

  addError(errors, isEmpty(v.dateEnd?.from), "dateEnd", "Thiếu ngày về");

  if (startDate && endDate) {
    const start = startDate.getTime();
    const end = endDate.getTime();

    const invalid = start >= end;

    if (invalid) {
      addError(errors, true, "dateEnd", "Ngày về phải lớn hơn ngày đi");
    } else {
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        addError(errors, true, "dateEnd", "Hành trình phải tối thiểu 1 ngày");
      }
    }
  }

  return errors;
};
