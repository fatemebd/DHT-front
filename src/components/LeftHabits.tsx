import { Grid, Typography } from "antd";
import Image from "next/image";
import React from "react";
import habits from "../../public/habits.png";
const { useBreakpoint } = Grid;

interface LeftHabitsProps {
  leftHabits: number | undefined;
}

const LeftHabits = ({ leftHabits }: LeftHabitsProps) => {
  const screens = useBreakpoint();

  return (
    <div className="md:px-2 py-1 md:gap-2 gap-1 flex rounded-md items-center ">
      <Typography className="md:text-xs text-[10px]">{leftHabits}</Typography>
      <Image
        alt="left habits"
        src={habits}
        width={screens.xs ? 30 : 40}
        height={screens.xs ? 30 : 40}
      />
    </div>
  );
};

export default LeftHabits;
