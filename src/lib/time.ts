import { format as fnsFormat, formatRelative } from "date-fns";

const formatters = {
  // '02/11/2014'
  "Day-Month-Year-Slashed": "dd/MM/yyyy",
  "Day-Month-Year-Time": "do LLL yyyy, hh:mm a",
} as const;

export const formatDate = (
  dateToFormat: Date,
  format: keyof typeof formatters = "Day-Month-Year-Time"
): string => {
  return fnsFormat(dateToFormat, formatters[format]);
};

export const formatDateFromNow = (date: Date) => {
  return formatRelative(date, new Date());
};
