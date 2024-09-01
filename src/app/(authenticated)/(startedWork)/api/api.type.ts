export interface User {
  id: number;
  email: string;
  score: number;
  mood: number | null;
  startWorkSession: string;
  dailyQuote: string;
  picture: string;
  allowedHabitsCount: number;
  allowedChangeProfile: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
