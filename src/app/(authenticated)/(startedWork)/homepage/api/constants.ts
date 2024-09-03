export const GET_TO_DO_LIST = "/habits/todo/";
export const GET_TODAY_HABITS_LIST = "/habits/today-habits/";
export const GET_REMINDERS_LIST = "/habits/reminder/list/";

export const CREATE_NEW_TASK = "/habits/todo/add-item/";
export const CREATE_NEW_REMINDER = "/habits/reminder/create/";

export const DELETE_REMINDER = (id: number) => `/habits/reminder/${id}/detail/`;
export const DELETE_TASK = (id: number) => `/habits/todo/item/${id}/`;

export const GET_HABIT_HISTORY = "/habits/report/monthly/";
