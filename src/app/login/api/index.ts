import axiosInstance from "@/utils/axios";
import type { PreSignup, SignupInfo } from "./api.types";
import { POST_LOGIN_EMAIL, POST_OTP } from "./constants";
import { useMutation } from "@tanstack/react-query";

const postEmail = async (email: PreSignup) => {
  const response = await axiosInstance.post(POST_LOGIN_EMAIL, email);
  return response;
};

const postOtp = async (data: SignupInfo) => {
  const response = await axiosInstance.post(POST_OTP, data);
  return response;
};

export const usePostEmail = () => {
  return useMutation({
    mutationKey: [POST_LOGIN_EMAIL],
    mutationFn: postEmail,
  });
};

export const usePostOtp = () => {
  return useMutation({
    mutationKey: [POST_OTP],
    mutationFn: postOtp,
    onSuccess:(data)=>{
        console.log(data);
    }
  });
};
