export interface CreatedHabit {
  name: string;
  description?: string;
  score?: number;
  isActive?: boolean;
  recurrenceSeconds: number;
  durationSeconds: number;
  notifBody:string;
}
