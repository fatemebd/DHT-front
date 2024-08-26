export interface User{
    id:string;
    email: string;
    token: string
}

export interface GithubUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}