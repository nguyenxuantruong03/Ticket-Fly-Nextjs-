import { ValidationError } from "../components/types";

export const addError = (
  errors: ValidationError[],
  condition: boolean,
  field: string,
  message: string,
) => {
  if (condition) {
    errors.push({ field, message });
  }
};

export const isEmpty = (v: unknown) => v === "" || v === undefined || v === null;
