"use client";

import React from "react";
import { MoodTracker } from "@/components/moodTracker/";
import { Button, Row } from "antd";
import { getTodayDate } from "@/utils/dateUtils";
import fa from "./fa.json";
import { useRouter } from "next/navigation";
import { isClient } from "@/utils/detectUtils";
import { useStartWork } from "./api";

const Page = () => {
  const { mutate: startDayMutate, isPending: isStartWorkPending } =
    useStartWork();

  const router = useRouter();

  const todayDate = getTodayDate();

  if (isClient()) {
    const startWork = localStorage.getItem("startWork");

    if (startWork === todayDate) {
      router.push("/homepage");
    }
  }

  const handleStartWork = () => {
    localStorage.setItem("startWork", todayDate);
    startDayMutate(undefined, {
      onSuccess: () => {
        router.push("/homepage");
      },
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Row
        justify="center"
        align="middle"
        className="md:bg-white md:bg-opacity-10 md:backdrop-blur-lg w-full  md:h-[40%] md:w-[50%] md:rounded-xl shadow-xl  text-white p-10 gap-5 flex items-center md:drop-shadow-2xl"
      >
        <MoodTracker mood={null} />
        <Button onClick={handleStartWork} type="primary">
          {fa.startWork}
        </Button>
      </Row>
    </div>
  );
};

export default Page;
