import axiosInstance from "@/utils/axios";
import { GET_DAILY_WORK_TIME, GET_WEEKLY_WORK_TIME } from "./constants";
import type { ListResponse } from "@/@types/server";
import type { DailyWorkTimeReport, WeeklyWorkTimeReport } from "./api.types";
import { useQuery } from "@tanstack/react-query";

const getWorkTimeDailyReport = async () => {
  const response: ListResponse<DailyWorkTimeReport> =
    await axiosInstance.get(GET_DAILY_WORK_TIME);
  return response.data;
};

const getWorkTimeWeeklyReport = async () => {
  const response: ListResponse<WeeklyWorkTimeReport> =
    await axiosInstance.get(GET_WEEKLY_WORK_TIME);
  return response.data;
};

export const useGetWorkTimeDailyReport = () => {
  return useQuery({
    queryKey: [GET_DAILY_WORK_TIME],
    queryFn: getWorkTimeDailyReport,
  });
};

export const useGetWorkTimeWeeklyReport = () => {
  return useQuery({
    queryKey: [GET_WEEKLY_WORK_TIME],
    queryFn: getWorkTimeWeeklyReport,
  });
};
