import axiosInstance from "@/utils/axios";
import { CREATE_NEW_HABIT } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { CreatedHabit } from "./api.types";

const createHabit = async (habit: CreatedHabit) => {
  const response = await axiosInstance.post(CREATE_NEW_HABIT, habit);
  return response;
};

export const useCreateHabit = () => {
  // const { refetch } = useGetUserDetail();

  return useMutation({
    mutationKey: [CREATE_NEW_HABIT],
    mutationFn: createHabit,
    // onSuccess: () => {
    //   refetch();
    // },
  });
};
