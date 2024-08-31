import jalaali from "jalaali-js";
import { toGregorian } from "jalaali-js";

export const getFormattedDateTime = (
  date: Date | string | number | null | undefined,
  shouldPersian = true
) => {
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

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const jalaaliDate = jalaali.toJalaali(dateObject);
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

  const formattedDateTime = `${day} ${monthName} ${year}`;

  return formattedDateTime;
};

export function convertJalaaliToGregorian(jalaaliDate: string): string {
    // Split the Jalaali date string into its components
    const parts = jalaaliDate.split('-').map(Number);
    if (parts.length !== 3) {
        throw new Error('Invalid Jalaali date format. Expected format: YYYY-MM-DD');
    }

    // Destructure the year, month, and day from the parts array
    const [jYear, jMonth, jDay] = parts;

    // Convert the Jalaali date to Gregorian
    const { gy, gm, gd } = toGregorian(jYear, jMonth, jDay);

    // Format the Gregorian date as YYYY-MM-DD
    const gregorianDate = `${gy}-${gm.toString().padStart(2, '0')}-${gd!.toString().padStart(2, '0')}`;
    return gregorianDate;
}

// Example usage
console.log(convertJalaaliToGregorian('1403-06-12'));  // Outputs: "2024-08-31"
