"use client";

import React from "react";
import BarChart from "../_components/BarChart";
import { useGetWorkTimeDailyReport, useGetWorkTimeWeeklyReport } from "./api";
import { convertGregorianToJalali } from "@/utils/dateUtils";
import { Col, Row, Typography } from "antd";
import fa from "../fa.json";

const Page = () => {
  const { data: weeklyReportData } = useGetWorkTimeWeeklyReport();
  const { data: dailyReportData } = useGetWorkTimeDailyReport();

  return (
    <>
      <Row
        gutter={[16, 16]}
        className="w-full md:max-h-full max-h-[90%] overflow-y-scroll md:overflow-hidden"
      >
        <Col md={12} xs={24}>
          <Typography>{fa.weeklyWorkTimeText}</Typography>
          <BarChart
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            data={weeklyReportData!}
            yAxis="workHours"
            xAxis={(item) =>
              `${convertGregorianToJalali(
                item.startOfWeek
              )} - ${convertGregorianToJalali(item.endOfWeek)}`
            }
          />
        </Col>
        <Col md={12} xs={24}>
          <Typography>{fa.dailyWorkTimeText}</Typography>

          <BarChart
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            data={dailyReportData!}
            yAxis="workHours"
            xAxis={(item) => `${convertGregorianToJalali(item.date)}`}
          />
        </Col>
      </Row>
    </>
  );
};

export default Page;
