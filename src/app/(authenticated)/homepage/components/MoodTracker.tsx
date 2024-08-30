import { Col, Row, Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import neutral from "../../../../../public/neutral.png";
import sad from "../../../../../public/sad.png";
import verySad from "../../../../../public/verySad.png";
import happy from "../../../../../public/happy.png";
import thrilled from "../../../../../public/thrilled.png";
import fa from "../fa.json";
import { twMerge } from "tailwind-merge";
const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | undefined>();
  const handlePickMood = (mood: number) => {
    setSelectedMood(mood);
  };
  return (
    <div className="bg-white bg-opacity-10 rounded-lg w-full px-2 py-2 backdrop-blur-lg h-fit">
      <Typography className="text-md font-semibold">
        حال احوال امروزت چطوره؟
      </Typography>
      <Row justify="space-around" className="my-2">
        <Col span={4} className="flex flex-col items-center" onClick={()=>handlePickMood(5)}>
          <Image
            alt="thrilled"
            src={thrilled}
            width={50}
            height={50}
            className={twMerge(
              selectedMood !== 5 && "grayscale",
              " hover:grayscale-0 duration-500 cursor-pointer"
            )}
          />
          <Typography className="text-xs font-normal mt-1">
            {fa.thrilled}
          </Typography>
        </Col>
        <Col span={4} className="flex flex-col items-center">
          <Image
            alt="happy"
            src={happy}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
          <Typography className="text-xs font-normal mt-1">
            {fa.happy}
          </Typography>
        </Col>
        <Col span={4} className="flex flex-col items-center">
          <Image
            alt="neutral"
            src={neutral}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
          <Typography className="text-xs font-normal mt-1">
            {fa.neutral}
          </Typography>
        </Col>

        <Col span={4} className="flex flex-col items-center">
          <Image
            alt="sad"
            src={sad}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
          <Typography className="text-xs font-normal mt-1">{fa.sad}</Typography>
        </Col>
        <Col span={4} className="flex flex-col items-center">
          <Image
            alt="verySad"
            src={verySad}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
          <Typography className="text-xs font-normal mt-1">
            {fa.verySad}
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default MoodTracker;
