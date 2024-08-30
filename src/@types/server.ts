export interface Response<T> {
  data: T;
  status: number;
}
export interface ListResponse<T> {
  data: T[];
  status: number;
}