export interface User {
  id: string;
  email: string;
  token: string;
}

export interface GithubUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

export interface Notif {
  habit_id: number;
  title: string;
  body: string;
}
