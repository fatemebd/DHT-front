import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import {
  IoAddOutline,
  IoReaderOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import fa from "../fa.json";
import { SiProbot } from "react-icons/si";
import { CiViewList } from "react-icons/ci";


export const sidebarItems = [
  {
    key: "homepage",
    icon: <HomeOutlined className="text-2xl" />,
    label: fa.home,
  },
  {
    key: "profile",
    icon: <UserOutlined className="text-2xl" />,
    label: fa.profile,
  },
   {
    key: "habits",
    icon: <CiViewList className="text-2xl" />,
    label: fa.habits,
  },
  {
    key: "statics/habits",
    icon: <IoBarChartOutline className="text-2xl" />,
    label: fa.statics,
  },
  {
    key: "suggest-habit",
    icon: <IoReaderOutline className="text-2xl" />,
    label: fa.suggestHabit,
  }, 
  {
    key: "doost-club",
    icon: <SiProbot className="text-2xl" />,
    label: fa.club,
  },
];
