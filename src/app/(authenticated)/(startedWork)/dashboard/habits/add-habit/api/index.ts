import axiosInstance from "@/utils/axios";
import { CREATE_NEW_HABIT } from "./constants";
import { useMutation } from "@tanstack/react-query";
import type { CreatedHabit } from "./api.types";
import { useGetHabitsList } from "../../api";

const createHabit = async (habit: CreatedHabit) => {
  const response = await axiosInstance.post(CREATE_NEW_HABIT, habit);
  return response;
};

export const useCreateHabit = () => {
  const { refetch } = useGetHabitsList();

  return useMutation({
    mutationKey: [CREATE_NEW_HABIT],
    mutationFn: createHabit,
    onSuccess: () => {
      refetch();
    },
  });
};
