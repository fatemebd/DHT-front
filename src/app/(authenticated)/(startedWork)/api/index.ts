import axiosInstance from "@/utils/axios";
import { GET_USER_DETAIL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import type { User } from "./api.type";
import type { Response } from "@/@types/server";
import dayjs from "dayjs";
// import { ListResponse } from "@/@types/server";

const getUserDetail = async (signal: AbortSignal) => {
	const response: Response<User> = await axiosInstance.get(GET_USER_DETAIL, {
		signal,
	});
	return { ...response.data, dateOfBirth: dayjs(response.data.dateOfBirth) };
};

export const useGetUserDetail = () => {
	return useQuery({
		queryKey: [GET_USER_DETAIL],
		queryFn: ({ signal }) => getUserDetail(signal),
	});
};
