import axiosInstance from "@/utils/axios";
import { BUY_FEATURE, GET_FEATURES_LIST } from "./constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Feature } from "./api.types";
import type { ListResponse, Response } from "@/@types/server";
import { useGetUserDetail } from "../../../api";

const getFeaturesList = async (signal: AbortSignal) => {
  const response: ListResponse<Feature> = await axiosInstance.get(
    GET_FEATURES_LIST,
    {
      signal,
    },
  );
  return response.data;
};

const getBuyFeature = async (id: number) => {
  const response: Response<Feature> = await axiosInstance.get(BUY_FEATURE(id), {
    // params: { id: id },
  });
  return response.data;
};

export const useGetFeaturesList = () => {
  return useQuery({
    queryKey: [GET_FEATURES_LIST],
    queryFn: ({ signal }) => getFeaturesList(signal),
  });
};

export const useGetBuyFeature = () => {
  const { refetch } = useGetUserDetail();
  return useMutation({
    mutationKey: [BUY_FEATURE],
    mutationFn: getBuyFeature,
    onSuccess: () => refetch(),
  });
};
