import axiosInstance from "@/utils/axios";
import { GET_NOODS_REPORT } from "./constants";
import type { ListResponse } from "@/@types/server";
import type {  MoodReportItem } from "./api.types";
import { useQuery } from "@tanstack/react-query";

const getMoodsReport = async () => {
  const response: ListResponse<MoodReportItem> =
    await axiosInstance.get(GET_NOODS_REPORT);
  return response.data;
};

export const useGetMoodsReport = () => {
  return useQuery({
    queryKey: [GET_NOODS_REPORT],
    queryFn: getMoodsReport,
  });
};
