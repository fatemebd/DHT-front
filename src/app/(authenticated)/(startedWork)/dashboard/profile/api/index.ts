import axiosInstance from "@/utils/axios";
import { PUT_USER_PROFILE, PUT_USER_PROFILE_PICTURE } from "./constants";
import type { User } from "@/@types/common";
import { useMutation } from "@tanstack/react-query";
import { useGetUserDetail } from "@/app/(authenticated)/(startedWork)/api";
import type { UploadFile } from "antd";

const updateUser = async (user: Partial<User>) => {
  const response = await axiosInstance.put(PUT_USER_PROFILE, user);
  return response;
};

const updateUserPic = async (file: File) => {
  const formData: FormData = new FormData();
  formData.append("picture", file);

  const response = await axiosInstance.put(PUT_USER_PROFILE_PICTURE, formData, {
    headers: {
      "Content-Type": undefined, // This should allow the browser to handle the content type automatically.
    },
  });

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

export const useUpdateUserPic = () => {
  const { refetch } = useGetUserDetail();

  return useMutation({
    mutationKey: [PUT_USER_PROFILE_PICTURE],
    mutationFn: updateUserPic,
    onError: (e) => console.error(e),
    onSuccess: () => {
      refetch();
    },
  });
};
