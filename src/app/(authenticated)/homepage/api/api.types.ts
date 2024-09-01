export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
  deadline: string;
}
export interface Habit {
  id: number;
  title: string;
  description: string;
  done: boolean;
  deadline: string;
  score:number;
}