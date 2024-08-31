// src/types/dayjs-jalali.d.ts
declare module "dayjs-jalali" {
  import { ConfigType, OptionType } from "dayjs";

  // Assuming 'dayjs-jalali' extends the dayjs object with new methods or properties
  // Define them here if known; otherwise, you can extend any to dayjs.Dayjs for simplicity
  interface DayjsJalaliExtension {
    isJalali: boolean;
  }
     interface DayjsConstructor {
       (
         date?: string | number | Date | Dayjs | null | undefined,
         config?: DayjsConfigType & { jalali?: boolean }
       ): Dayjs;
     }

  // Extend the dayjs.Dayjs interface to include your custom properties or methods
  module "dayjs" {
    interface Dayjs extends DayjsJalaliExtension {}
  }

  // Export anything specific to dayjs-jalali if needed
  export function someSpecificFunction(): void;
}
declare module "dayjs-jalali" {
  import { PluginFunc } from "dayjs";

  const jalaliPlugin: PluginFunc<any>;
  export default jalaliPlugin;
}