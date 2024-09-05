import { Grid, Typography } from "antd";
import Image from "next/image";
import React from "react";
import coin from "../../public/coin.png";
const { useBreakpoint } = Grid;

interface ScoreProps {
  score: number | undefined;
}

const Score = ({ score }: ScoreProps) => {
  const screens = useBreakpoint();

  return (
    <div className="px-2 py-1 md:gap-2 gap-1 flex rounded-md items-center ">
      <Typography className="md:text-xs text-[10px]">{score}</Typography>
      <Image
        alt="coin"
        src={coin}
        width={screens.xs ? 20 : 30}
        height={screens.xs ? 20 : 30}
      />
    </div>
  );
};

export default Score;
