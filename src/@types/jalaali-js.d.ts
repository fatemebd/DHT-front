// File: @types/jalaali-js.d.ts

declare module "jalaali-js" {
  export function toJalaali(
    date: Date | number | { year: number; month: number; day: number }
  ): JalaaliDate;
  export function toGregorian(
    year: number,
    month: number,
    day: number
  ): GregorianDate;
  export function isValidJalaaliDate(
    year: number,
    month: number,
    day: number
  ): boolean;
  export function isLeapJalaaliYear(year: number): boolean;
  export const jalaaliWeekdays: string[];

  export interface JalaaliDate {
    jYear: number;
    jMonth: number;
    jDay: number;
  }

  export interface GregorianDate {
    year: number;
    month: number;
    day: number;
  }
}
