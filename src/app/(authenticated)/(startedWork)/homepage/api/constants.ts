export const GET_TO_DO_LIST = "/habits/todo/";
export const GET_TODAY_HABITS_LIST = "/habits/today-habits/";
export const GET_REMINDERS_LIST = "/habits/reminder/list/";

export const CREATE_NEW_TASK = "/habits/todo/add-item/";
export const CREATE_NEW_REMINDER = "/habits/reminder/create/";

export const DELETE_REMINDER = (id: number) => `/habits/reminder/${id}/detail/`;
export const DELETE_TASK = (id: number) => `/habits/todo/item/${id}/`;

export const GET_HABIT_HISTORY = "/habits/report/monthly/";

export const POST_FCM_TOKEN = "/habits/fcm/";

export const GET_HABIT_DETAIL = (id: number) =>
  `/habits/recurring/${id}/detail/`;

export const POST_DONE_HABIT = (id: number) => `/habits/end-habit/${id}/`;
export const POST_DONE_TASK = (id: number) => `/habits/todo/item/end/${id}/`;
