import axiosInstance from "@/utils/axios";
import { PreSignup } from "./api.types";
import { POST_LOGIN_EMAIL } from "./constants";
import { useMutation } from "@tanstack/react-query";

const postEmail = async (email: PreSignup) => {
  const response = await axiosInstance.post(POST_LOGIN_EMAIL, email);
  return response;
};

export const usePostEmail = () => {
  return useMutation({
    mutationKey: [POST_LOGIN_EMAIL],
    mutationFn: postEmail,
  });
};
