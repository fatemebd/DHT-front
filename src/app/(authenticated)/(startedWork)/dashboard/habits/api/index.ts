import axiosInstance from "@/utils/axios";
import {  GET_HABITS_LIST } from "./constants";
import type { ListResponse } from "@/@types/server";
import { useQuery } from "@tanstack/react-query";
import { Habit } from "../../../homepage/api/api.types";

const getHabitsList = async () => {
  const response: ListResponse<Habit> =
    await axiosInstance.get(GET_HABITS_LIST);
  return response.data;
};


export const useGetHabitsList = () => {
  return useQuery({
    queryKey: [GET_HABITS_LIST],
    queryFn: getHabitsList,
  });
};
