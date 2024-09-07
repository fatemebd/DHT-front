import axiosInstance from "@/utils/axios";
import { GET_DAILY_HABITS, GET_WEEKLY_HABITS } from "./constants";
import type { ListResponse } from "@/@types/server";
import type { DailyHabitsReport, WeeklyHabitsReport } from "./api.types";
import { useQuery } from "@tanstack/react-query";

const getHabitDailyReport = async () => {
  const response: ListResponse<DailyHabitsReport> =
    await axiosInstance.get(GET_DAILY_HABITS);
  return response.data;
};

const getHabitsWeeklyReport = async () => {
  const response: ListResponse<WeeklyHabitsReport> =
    await axiosInstance.get(GET_WEEKLY_HABITS);
  return response.data;
};

export const useGetHabitDailyReport = () => {
  return useQuery({
    queryKey: [GET_DAILY_HABITS],
    queryFn: getHabitDailyReport,
  });
};

export const useGetHabitsWeeklyReport = () => {
  return useQuery({
    queryKey: [GET_WEEKLY_HABITS],
    queryFn: getHabitsWeeklyReport,
  });
};
