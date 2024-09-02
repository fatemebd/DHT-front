import axiosInstance from "@/utils/axios";
import {
  GET_TO_DO_LIST,
  GET_HABITS_LIST,
  GET_REMINDERS_LIST,
  CREATE_NEW_TASK,
  CREATE_NEW_REMINDER,
} from "./constants";
import { useQuery } from "@tanstack/react-query";
import type { ListResponse } from "@/@types/server";
import type { Habit, Reminder, Task } from "./api.types";
import { useMutation } from "@tanstack/react-query";

const getToDoList = async (signal: AbortSignal) => {
  const response: ListResponse<Task> = await axiosInstance.get(GET_TO_DO_LIST, {
    signal,
  });
  return response.data;
};

const getHabitsList = async (signal: AbortSignal) => {
  const response: ListResponse<Habit> = await axiosInstance.get(
    GET_HABITS_LIST,
    {
      signal,
    },
  );
  return response.data;
};

const getReminderssList = async (signal: AbortSignal) => {
  const response: ListResponse<Reminder> = await axiosInstance.get(
    GET_REMINDERS_LIST,
    {
      signal,
    },
  );
  return response.data;
};

const createTask = async (task: Task) => {
  const response = await axiosInstance.post(CREATE_NEW_TASK, task);
  return response;
};

const createReminder= async (reminder: Reminder) => {
  const response = await axiosInstance.post(CREATE_NEW_REMINDER, reminder);
  return response;
};

export const useGetToDoList = () => {
  return useQuery({
    queryKey: [GET_TO_DO_LIST],
    queryFn: ({ signal }) => getToDoList(signal),
  });
};

export const useGetHabitsList = () => {
  return useQuery({
    queryKey: [GET_HABITS_LIST],
    queryFn: ({ signal }) => getHabitsList(signal),
  });
};

export const useGetRemindersList = () => {
  return useQuery({
    queryKey: [GET_REMINDERS_LIST],
    queryFn: ({ signal }) => getReminderssList(signal),
  });
};

export const useCreateTask = () => {
  const { refetch } = useGetToDoList();

  return useMutation({
    mutationKey: [CREATE_NEW_TASK],
    mutationFn: createTask,
    onSuccess: () => {
      refetch();
    },
  });
};

export const useCreateReminder= () => {
  const { refetch } = useGetRemindersList();

  return useMutation({
    mutationKey: [CREATE_NEW_REMINDER],
    mutationFn: createReminder,
    onSuccess: () => {
      refetch();
    },
  });
};