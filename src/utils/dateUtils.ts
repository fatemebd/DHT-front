import jalaali, { toJalaali } from "jalaali-js";
import { toGregorian } from "jalaali-js";

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
  const time = isoDateString.split("T")[1];
  const hourMin = `${time.split(":")[0]}:${time.split(":")[1]}`;

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

  // const time = timeFormatter.format(date);
  const dayName = isToday ? "امروز" : dayNames[date.getDay()];

  return `${dayName} ${hourMin}`;
}

type DateObject = {
  $C: string;
  $D: number;
  $H: number;
  $L: string;
  $M: number;
  $W: number;
  $d: Date;
  $isDayjsObject: boolean;
  $jD: number;
  $jM: number;
  $jy: number;
  $m: number;
  $ms: number;
  $s: number;
  $u: undefined;
  $x: object;
  $y: number;
};

export function formatDateToISOString(date: unknown): string {
  const dateObj = date as DateObject;
  const year = dateObj.$y;
  const month = String(dateObj.$M + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObj.$D).padStart(2, "0");
  const hours = String(dateObj.$H).padStart(2, "0");
  const minutes = String(dateObj.$m).padStart(2, "0");
  const seconds = String(dateObj.$s).padStart(2, "0");
  const milliseconds = String(dateObj.$ms).padStart(3, "0");

  // Combine the components into the ISO 8601 format without converting to UTC
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export const convertGregorianToJalali = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const newDate = new Date(year, month - 1, day);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const jalali: any = jalaali.toJalaali(newDate);

  const dayOfWeek = (newDate.getDay() + 1) % 7;

  const jalaliDate = `${jalali.jy}/${String(jalali.jm).padStart(
    2,
    "0",
  )}/${String(jalali.jd).padStart(2, "0")}`;

  return jalaliDate;
};

export function getDayOfWeekIndex(dateString: string): number {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return (dayOfWeek + 1) % 7;
}
