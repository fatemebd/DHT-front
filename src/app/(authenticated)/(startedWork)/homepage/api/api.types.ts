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
  reminderTime: string;
}

export interface HabitHistoryDay {
  date: string;
  progress: number;
}

export interface FCMToken {
  fcmToken: string;
  owner: number;
}

export interface HabitStatus {
  status: "DONE" | "UNDONE";
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  media: string;
}
