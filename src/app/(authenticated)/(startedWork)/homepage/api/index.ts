import axiosInstance from "@/utils/axios";
import {
  GET_TO_DO_LIST,
  GET_TODAY_HABITS_LIST,
  GET_REMINDERS_LIST,
  CREATE_NEW_TASK,
  CREATE_NEW_REMINDER,
  DELETE_REMINDER,
  DELETE_TASK,
  GET_HABIT_HISTORY,
} from "./constants";
import { useQuery } from "@tanstack/react-query";
import type { ListResponse } from "@/@types/server";
import type { Habit, HabitHistoryDay, Reminder, Task } from "./api.types";
import { useMutation } from "@tanstack/react-query";

const getToDoList = async (signal: AbortSignal) => {
  const response: ListResponse<Task> = await axiosInstance.get(GET_TO_DO_LIST, {
    signal,
  });
  return response.data;
};

const getHabitsList = async (signal: AbortSignal) => {
  const response: ListResponse<Habit> = await axiosInstance.get(
    GET_TODAY_HABITS_LIST,
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

const getHabitHistory = async (signal: AbortSignal) => {
  const response: ListResponse<HabitHistoryDay> = await axiosInstance.get(
    GET_HABIT_HISTORY,
    {
      signal,
    },
  );
  return response.data;
};

const createReminder = async (reminder: Reminder) => {
  const response = await axiosInstance.post(CREATE_NEW_REMINDER, reminder);
  return response;
};

const deleteReminder = async (id: number) => {
  const response = await axiosInstance.delete(DELETE_REMINDER(id));
  return response;
};

const deleteTask = async (id: number) => {
  const response = await axiosInstance.delete(DELETE_TASK(id));
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
    queryKey: [GET_TODAY_HABITS_LIST],
    queryFn: ({ signal }) => getHabitsList(signal),
  });
};

export const useGetRemindersList = () => {
  return useQuery({
    queryKey: [GET_REMINDERS_LIST],
    queryFn: ({ signal }) => getReminderssList(signal),
  });
};

export const useGetHabitHistory = () => {
  return useQuery({
    queryKey: [GET_HABIT_HISTORY],
    queryFn: ({ signal }) => getHabitHistory(signal),
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

export const useCreateReminder = () => {
  const { refetch } = useGetRemindersList();

  return useMutation({
    mutationKey: [CREATE_NEW_REMINDER],
    mutationFn: createReminder,
    onSuccess: () => {
      refetch();
    },
  });
};

export const useDeleteReminder = () => {
  const { refetch } = useGetRemindersList();

  return useMutation({
    mutationKey: [DELETE_REMINDER],
    mutationFn: deleteReminder,
    onSuccess: () => {
      refetch();
    },
  });
};

export const useDeleteTask = () => {
  const { refetch } = useGetToDoList();

  return useMutation({
    mutationKey: [DELETE_TASK],
    mutationFn: deleteTask,
    onSuccess: () => {
      refetch();
    },
  });
};
