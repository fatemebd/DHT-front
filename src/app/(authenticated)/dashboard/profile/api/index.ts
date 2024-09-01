import axiosInstance from "@/utils/axios";
import { PUT_USER_PROFILE } from "./constants";
import { User } from "@/@types/common";
import { useMutation } from "@tanstack/react-query";
import { useGetUserDetail } from "@/app/(authenticated)/api";

const updateUser = async (user: Partial<User>) => {
  const response = await axiosInstance.put(PUT_USER_PROFILE, user);
  return response;
};

export const useUpdateUser = () => {
    const { refetch } = useGetUserDetail();

  return useMutation({
    mutationKey: [PUT_USER_PROFILE],
    mutationFn: updateUser,
    onSuccess: () => {
      refetch();
    },
  });
};
