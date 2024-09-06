"use client";

import React from "react";
import BarChart from "../_components/BarChart";
import { useGetHabitDailyReport, useGetHabitsWeeklyReport } from "./api";
import { convertGregorianToJalali } from "@/utils/dateUtils";
import { Col, Row, Typography } from "antd";
import fa from "../fa.json";

const Page = () => {
  const { data: weeklyReportData } = useGetHabitsWeeklyReport();
  const { data: dailyReportData } = useGetHabitDailyReport();

  return (
    <>
      <Row
        gutter={[16, 16]}
        className="w-full md:max-h-full max-h-[90%] overflow-y-scroll md:overflow-hidden"
      >
        <Col md={12} xs={24}>
          <Typography>{fa.weeklyHabitText}</Typography>
          <BarChart
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            data={weeklyReportData!}
            yAxis="progress"
            xAxis={(item) =>
              `${convertGregorianToJalali(
                item.startOfWeek
              )} - ${convertGregorianToJalali(item.endOfWeek)}`
            }
          />
        </Col>
        <Col md={12} xs={24}>
          <Typography>{fa.dailyHabitText}</Typography>

          <BarChart
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            data={dailyReportData!}
            yAxis="progress"
            xAxis={(item) => `${convertGregorianToJalali(item.date)}`}
          />
        </Col>
      </Row>
    </>
  );
};

export default Page;
