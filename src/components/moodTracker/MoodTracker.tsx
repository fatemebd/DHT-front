import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import Image from "next/image";
import fa from "./fa.json";
import { twMerge } from "tailwind-merge";
import { moods } from "./constants/Moods";
import { usePostMood } from "./api";

const MoodTracker = ({ mood }: { mood: number | undefined | null }) => {
  const [selectedMood, setSelectedMood] = useState<number | undefined | null>(
    mood
  );
  const { mutate: postMoodMutate } = usePostMood();

  useEffect(() => {
    setSelectedMood(mood);
  }, [mood]);

  const handlePickMood = (mood: number) => {
    setSelectedMood(mood);
    postMoodMutate({ mood: mood });
  };
  return (
    <div className="bg-white bg-opacity-10 rounded-lg w-full px-2 py-2 backdrop-blur-lg h-fit">
      <Typography className="text-md font-semibold">{fa.whatMood}</Typography>
      <Row justify="space-around" className="my-2">
        {moods.map((mood) => (
          <Col
            key={mood.id}
            span={4}
            className="flex flex-col items-center"
            onClick={() => handlePickMood(mood.id)}
          >
            <Image
              alt={mood.alt}
              src={mood.image}
              width={50}
              height={50}
              className={twMerge(
                selectedMood !== mood.id && "grayscale",
                "hover:grayscale-0 duration-500 cursor-pointer"
              )}
            />
            <Typography className="text-xs font-normal mt-1">
              {mood.alt}
            </Typography>
          </Col>
        )).reverse()}
      </Row>
    </div>
  );
};

export { MoodTracker };
