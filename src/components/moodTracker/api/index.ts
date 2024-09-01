import axiosInstance from "@/utils/axios";
import { SUBMIT_MOOD } from "./constants";
import { useMutation } from "@tanstack/react-query";

const postMood = async (mood: { mood: number }) => {
  const response = await axiosInstance.post(SUBMIT_MOOD, mood);
  return response;
};

export const usePostMood = () => {
  return useMutation({
    mutationKey: [SUBMIT_MOOD],
    mutationFn: postMood,
  });
};
