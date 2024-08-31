export interface User {
  id: number;
  email: string;
  score: number;
  mood: string;
  startWorkSession: string;
  dailyQuote: string;
  picture: string;
  allowedHabitsCount: number;
  allowedChangeProfile: boolean;
}
