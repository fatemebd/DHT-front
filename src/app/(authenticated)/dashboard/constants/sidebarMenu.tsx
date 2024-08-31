
import {
  UserOutlined,
} from '@ant-design/icons';
import { IoAddOutline,IoReaderOutline,IoBarChartOutline } from "react-icons/io5";
import fa from "../fa.json"


export const sidebarItems = [
            {
              key: '1',
              icon: <UserOutlined className="text-2xl"/>,
              label: fa.profile,
            },
            {
              key: '2',
              icon: <IoReaderOutline className="text-2xl"/>,
              label: fa.suggestHabit,
            },
            {
              key: '3',
              icon: <IoBarChartOutline className="text-2xl"/>,
              label: fa.statics,
            },
              {
              key: '4',
              icon: <IoAddOutline className="text-2xl"/>,
              label: fa.addHabit,
            },
          ]