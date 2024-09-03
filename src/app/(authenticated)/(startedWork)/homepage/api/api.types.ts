export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
  deadline: string;
}
export interface Habit {
  id: number;
  name: string;
  description?: string;
}

export interface Reminder {
  id: number;
  name: string;
  description?: string;
  reminderTime:string;
}

export interface HabitHistoryDay{
  date:string;
  progress:number
}