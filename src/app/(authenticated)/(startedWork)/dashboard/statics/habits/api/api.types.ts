export interface DailyHabitsReport {
  date: string;
  progress: number;
}

export interface WeeklyHabitsReport {
  startOfWeek: string;
  endOfWeek: string;
  progress: number;
}
