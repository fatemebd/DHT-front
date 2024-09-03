import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react'
import habits from "../../public/habits.png"

interface LeftHabitsProps {
  leftHabits: number | undefined;
}

const LeftHabits = ({ leftHabits }: LeftHabitsProps) => {
  return (
    <div className="px-2 py-1 gap-2 flex rounded-md items-center ">
      <Typography className="text.xs">{leftHabits}</Typography>
      <Image alt="left habits" src={habits} width={40} height={40} />
    </div>
  );
};

export default LeftHabits