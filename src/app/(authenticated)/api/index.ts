import axiosInstance from "@/utils/axios";
import { GET_USER_DETAIL } from "./constants";
import { useQuery } from "@tanstack/react-query";
// import { ListResponse } from "@/@types/server";

const getUserDetail = async (signal: AbortSignal) => {
  const response = await axiosInstance.get(GET_USER_DETAIL, {
    signal,
  });
  return response.data;
};

export const useGetUserDetail = () => {
  return useQuery({
    queryKey: [GET_USER_DETAIL],
    queryFn: ({ signal }) => getUserDetail(signal),
  });
};
