export interface DailyWorkTimeReport {
  date: string;
  workHours: number;
}

export interface WeeklyWorkTimeReport {
  startOfWeek: string;
  endOfWeek: string;
  workHours: number;
}
