import { format as fnsFormat, formatRelative } from "date-fns";

const formatters = {
  // '02/11/2014'
  "Day-Month-Year-Slashed": "dd/MM/yyyy",
  "Day-Month-Year": "dd MMM yyyy",
  // '2014/11/02'
  "Year-Month-Day": "yyyy/MM/dd",
  // '02 Nov'
  "Day-Month": "dd MMM",
  // '2014-11-02'
  "Year-Month-Day-Hyphenated": "yyyy-MM-dd",
  // '2014-11'
  "Year-Month-Hyphenated": "yyyy-MM",
  // '20141102'
  YearMonthDay: "yyyyMMdd",
} as const;

export const formatDate = (
  dateToFormat: Date,
  format: keyof typeof formatters = "Day-Month-Year-Slashed"
): string => {
  return fnsFormat(dateToFormat, formatters[format]);
};

export const formatDateFromNow = (date: Date) => {
  return formatRelative(date, new Date());
};
