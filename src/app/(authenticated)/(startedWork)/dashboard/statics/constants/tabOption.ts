import type { TabsProps } from "antd";
import fa from "../fa.json";


export const items: TabsProps["items"] = [
  {
    key: "habits",
    label: fa.habits,
  },
  {
    key: "work-time",
    label: fa.workTime,
  },
  {
    key: "moods",
    label: fa.moods,
  },
];
