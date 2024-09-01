
import {
  UserOutlined,
} from '@ant-design/icons';
import { IoAddOutline,IoReaderOutline,IoBarChartOutline } from "react-icons/io5";
import fa from "../fa.json"
import { SiProbot } from "react-icons/si";

export const sidebarItems= [
            {
              key: 'profile',
              icon: <UserOutlined className="text-2xl"/>,
              label: fa.profile,
            },
            {
              key: "suggest-habit",
              icon: <IoReaderOutline className="text-2xl"/>,
              label: fa.suggestHabit,

            },
            {
              key: 'statics',
              icon: <IoBarChartOutline className="text-2xl"/>,
              label: fa.statics,

            },
              {
              key: "add-habit",
              icon: <IoAddOutline className="text-2xl"/>,
              label: fa.addHabit,

            },
              {
              key:"doost-club",
              icon: <SiProbot className="text-2xl"/>,
              label: fa.club,

            },
          ]