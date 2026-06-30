import { TicketBusValue, ValidationError } from "../components/types";
import { addError, isEmpty } from "./utils";

const toDate = (d?: string | Date) => {
  if (isEmpty(d)) return null;

  const date = new Date(d!);
  return isNaN(date.getTime()) ? null : date;
};

export const validateTicketBus = (v: TicketBusValue): ValidationError[] => {
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

  if (v.return_and_depart) {
    addError(errors, isEmpty(v.dateEnd?.from), "dateEnd", "Thiếu ngày về");

    if (startDate && endDate) {
      const start = startDate.getTime();
      const end = endDate.getTime();

      if (start >= end) {
        addError(errors, true, "dateEnd", "Ngày về phải lớn hơn ngày đi");
      }
    }
  }

  // ======================
  // PASSENGER
  // ======================
  addError(
    errors,
    isEmpty(v.passenger?.passenger) || v.passenger.passenger < 1,
    "passenger",
    "Thiếu số hành khách",
  );

  return errors;
};
