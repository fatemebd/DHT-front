import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import fa from "../fa.json";
import { isClient } from "@/utils/detectUtils";
import type { MenuProps } from "antd";

export const getUserItems = ({
  logout,
  isLogOutPending,
  handleOpenExercise,
}: {
  logout: () => void;
  handleOpenExercise: () => void;
  isLogOutPending: boolean;
}): MenuProps["items"] => [
  {
    key: 1,
    label: <Link href="/dashboard/profile">{fa.dashboard}</Link>,
    icon: <RxDashboard />,
  },
  {
    key: 2,
    label: fa.exercise,
    onClick: handleOpenExercise,
    icon: <MdOutlineSportsMartialArts />,
  },
  {
    key: 3,
    danger: true,
    label: fa.logout,
    disabled: isLogOutPending,
    icon: <IoExitOutline size={20} />,
    onClick: logout,
  },
];
