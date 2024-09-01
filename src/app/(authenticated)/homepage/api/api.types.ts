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
  deadline: string;
  score:number;
}