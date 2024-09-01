import jalaali, {toJalaali} from "jalaali-js";
import { toGregorian } from "jalaali-js";
interface JalaaliDate {
  day: number; // day of the month in Jalaali calendar
  month: number; // month of the year in Jalaali calendar
  year: number; // year in Jalaali calendar
}

interface JalaaliDate {
  jd: number;
  jm: number;
  jy: number;
}

export const getFormattedDateTime = (
  date: Date | string | number | null | undefined,
  shouldPersian = true,
): string | null => {
  if (!date) {
    return null;
  }

  const dateObject = new Date(date);
  if (!shouldPersian) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const jalaaliDate: any = jalaali.toJalaali(dateObject);
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const day = jalaaliDate.jd;
  const monthName = months[jalaaliDate.jm - 1];
  const year = jalaaliDate.jy;

  return `${day} ${monthName} ${year}`;
};

export function convertJalaaliToGregorian(jalaaliDate: string): string {
  // Split the Jalaali date string into its components
  const parts = jalaaliDate.split("-").map(Number);
  if (parts.length !== 3) {
    throw new Error("Invalid Jalaali date format. Expected format: YYYY-MM-DD");
  }

  // Destructure the year, month, and day from the parts array
  const [jYear, jMonth, jDay] = parts;

  // Convert the Jalaali date to Gregorian
  const { gy, gm, gd } = toGregorian(jYear, jMonth, jDay);

  // Format the Gregorian date as YYYY-MM-DD
  const gregorianDate = `${gy}-${gm.toString().padStart(2, "0")}-${
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    gd!
      .toString()
      .padStart(2, "0")
  }`;
  return gregorianDate;
}

export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};


export function formatPersianDate(isoDateString: string): string {
  // Parse the ISO date string
  const date = new Date(isoDateString);

  // Get the current date to compare with
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time parts for accurate comparison

  // Convert to Jalaali date
  const jalaaliDate = toJalaali(date);

  // Check if the date is today
  const isToday = date.setHours(0, 0, 0, 0) === currentDate.getTime();

  // Persian day names
  const dayNames = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];

  // Format the time using Intl
  const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const time = timeFormatter.format(date);
  const dayName = isToday ? "امروز" : dayNames[date.getDay()];

  return `${dayName} ${time}`;
}

// Example usage:
// console.log(formatPersianDate("2024-09-01T23:17:09.531Z"));
