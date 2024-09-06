import axiosInstance from "@/utils/axios";
import { SUBMIT_MOOD } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { useGetUserDetail } from "@/app/(authenticated)/(startedWork)/api";

const postMood = async (mood: { mood: number }) => {
  const response = await axiosInstance.post(SUBMIT_MOOD, mood);
  return response;
};

export const usePostMood = () => {
const {refetch }
= useGetUserDetail()

  return useMutation({
    mutationKey: [SUBMIT_MOOD],
    mutationFn: postMood,
    onSuccess:()=>{
      refetch()
    }
  });
};
