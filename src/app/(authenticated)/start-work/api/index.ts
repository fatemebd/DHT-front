import axiosInstance from "@/utils/axios";
import { START_WORK, END_WORK, LOG_OUT } from "./constants";
import { useMutation } from "@tanstack/react-query";

const startWork = async () => {
  const response = await axiosInstance.get(START_WORK);
  return response;
};

const endWork = async () => {
  const response = await axiosInstance.get(END_WORK);
  return response;
};

const logOut = async () => {
  const response = await axiosInstance.get(LOG_OUT);
  return response;
};

export const useStartWork = () => {
  return useMutation({
    mutationKey: [START_WORK],
    mutationFn: startWork,
  });
};

export const useEndWork = () => {
  return useMutation({
    mutationKey: [END_WORK],
    mutationFn: endWork,
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: [LOG_OUT],
    mutationFn: logOut,
  });
};
