"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import fa from "../fa.json";
import { moods } from "@/components/moodTracker/constants/Moods";
import Image from "next/image";
import { Col, Grid, Row, Typography } from "antd";
import { useGetMoodsReport } from "./api";
const { useBreakpoint } = Grid;

const SimplePieChart = () => {

  const {data:moodReport} =useGetMoodsReport()
  // Transform the rawData into an array suitable for rendering in PieChart
  const mappedData = moodReport?.map((item) => {
    return { name: fa[item.name], value: item.value };
  });
  const screens = useBreakpoint();
  return (
    <Row className="w-full items-center h-full md:px-10" align="middle" justify="center">
      <Col md={14} xs={24}>
        <ResponsiveContainer width="100%" height={screens.md ? 400 : 200}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={mappedData}
              cx="50%"
              cy="50%"
              outerRadius={screens.md ? 180 :80}
              fill="#8884d8"
              label
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col
        xs={24}
        md={4}
        className="flex md:w-full md:flex-col justify-end  md:gap-1 gap-5 "
      >
        <Row justify="space-around" className="my-2 gap-3">
          {moods
            .map((mood) => (
              <Col
                key={mood.id}
                xs={4}
                md={24}
                className="flex md:flex-row-reverse md:gap-3 flex-col items-center"
              >
                <Image alt={mood.alt} src={mood.image} width={50} height={50} />
                <Typography className="text-[8px] md:text-base font-normal mt-1">
                  {mood.alt}
                </Typography>
              </Col>
            ))
            .reverse()}
        </Row>
        {/* </div> */}
      </Col>
    </Row>
  );
};

export default SimplePieChart;
