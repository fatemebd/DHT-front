import { useEffect, useState } from "react";
import { Row, Col, Typography, Tooltip } from "antd";
import { convertGregorianToJalali, getDayOfWeekIndex } from "@/utils/dateUtils";
import { useGetHabitHistory } from "../api";
import { twMerge } from "tailwind-merge";
import type { HabitHistoryDay } from "../api/api.types";
import { getWeekDays } from "../constants/weekDays";

const HabitHistory = () => {
  const { data: habitHistoryData } = useGetHabitHistory();
  const [fullData, setFullData] = useState<HabitHistoryDay[]>();

  const jalaliWeekdays = getWeekDays();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (habitHistoryData) {
      const cells: HabitHistoryDay[] = [
        ...Array(getDayOfWeekIndex(habitHistoryData[0].date)).fill({
          date: "",
          progress: 0,
        }),
        ...habitHistoryData,
      ];
      setFullData(cells);
    }
  }, [habitHistoryData]);

  return (
    <div className="mt-4 w-full rounded-lg bg-white bg-opacity-5 p-3 pr-[15%] text-center">
      <Row gutter={[8, 8]} className="w-full text-center text-white mb-3">
        {jalaliWeekdays.map((day) => (
          <Col key={day} span={3}>
            <Typography className="text-white">{day}</Typography>
          </Col>
        ))}
      </Row>

      {fullData &&
        Array.from(
          { length: Math.ceil(fullData.length / 7) },
          (_, k) => k * 7
        ).map((startIndex) => (
          <Row
            key={startIndex}
            gutter={[16, 16]}
            wrap={true}
            className="w-full"
          >
            {fullData?.slice(startIndex, startIndex + 7).map((item, index) =>
              item.date === "" ? (
                <Col
                  key={`empty${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  span={3}
                  className="flex w-full flex-col items-center"
                >
                  <div
                    className="m-0.5 h-8 w-full rounded-md sm:h-10 md:m-2 md:h-8"
                    style={{
                      backgroundColor: `rgba(115, 57, 237, ${
                        item.progress / 100
                      })`,
                    }}
                  />
                </Col>
              ) : (
                <Tooltip
                  key={item.date}
                  title={convertGregorianToJalali(item.date)}
                >
                  <Col span={3} className="flex w-full flex-col items-center">
                    <div
                      className={twMerge(
                        item.progress === 0 && "border-gray-600",
                        "m-0.5 h-8 w-full rounded-md sm:h-10 md:m-2 md:h-8 border"
                      )}
                      style={{
                        backgroundColor: `rgba(115, 57, 237, ${
                          item.progress / 100
                        })`,
                      }}
                    />
                  </Col>
                </Tooltip>
              )
            )}
          </Row>
        ))}
    </div>
  );
};

export default HabitHistory;
