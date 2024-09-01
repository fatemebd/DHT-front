import axiosInstance from "@/utils/axios";
import { GET_TO_DO_LIST } from "./constants";
import { useQuery } from "@tanstack/react-query";
import type { ListResponse } from "@/@types/server";
import type { Task } from "./api.types";

const getToDoList = async (signal: AbortSignal) => {
  const response: ListResponse<Task> = await axiosInstance.get(GET_TO_DO_LIST, {
    signal,
  });
  return response.data;
};

export const useGetToDoList = () => {
  return useQuery({
    queryKey: [GET_TO_DO_LIST],
    queryFn: ({ signal }) => getToDoList(signal),
  });
};
