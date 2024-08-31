import { Typography } from "antd";
import Image from "next/image";
import React from "react";
import coin from "../../public/coin.png.png";

interface ScoreProps {
  score: number | undefined;
}

const Score = ({ score }: ScoreProps) => {
  return (
    <div className="px-2 py-1 gap-2 flex rounded-md items-center ">
      <Typography className="text.xs">{score}</Typography>
      <Image alt="coin" src={coin} width={30} height={30} />
    </div>
  );
};

export default Score;
