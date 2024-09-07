"use client";

import { Grid } from "antd";
import React from "react";
import {
  BarChart as ReachartBar,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const { useBreakpoint } = Grid;

// const data = [
//   {
//     start_of_week: "2024-08-31",
//     end_of_week: "2024-09-06",
//     completion_rate: 71.42857142857143,
//   },
//   {
//     start_of_week: "2024-08-24",
//     end_of_week: "2024-08-30",
//     completion_rate: 50,
//   },
//   {
//     start_of_week: "2024-08-17",
//     end_of_week: "2024-08-23",
//     completion_rate: 30,
//   },
//   {
//     start_of_week: "2024-08-10",
//     end_of_week: "2024-08-16",
//     completion_rate: 80,
//   },
//   {
//     start_of_week: "2024-08-03",
//     end_of_week: "2024-08-09",
//     completion_rate: 10,
//   },
// ];

interface BarChratProps<T> {
  data: T[];
  xAxis: (item: T) => string;
  yAxis: string;
}

const BarChart = <T extends {}>({ data, xAxis, yAxis }: BarChratProps<T>) => {
  const screens = useBreakpoint();
  return (
    <div
      style={{ width: "100%", height: "450px" }}
      className="align-middle flex justify-center"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        // className="align-middle flex justify-center"
      >
        <ReachartBar
          data={data}
          margin={{
            top: 20,
            // right: 30,
            // left: 50,
            bottom: screens.xs ? 80 : 20,
          }}
          className="w-full align-middle"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxis}
            // dataKey={(item) => `${item.start_of_week} - ${item.end_of_week}`}
            angle={screens.xs ? 90 : 0} // Rotate labels on mobile
            textAnchor={screens.xs ? "end" : "middle"} // Align labels properly when rotated
            interval={0} // Display all labels
            dy={screens.xs ? 10 : 0} // Adjust position of labels when rotated
            fontSize={8}
          />
          <YAxis
            textAnchor={screens.xs ? "start" : "middle"} // Align labels properly when rotated
          />
          <Tooltip />
          <Bar dataKey={yAxis} fill="#8884d8" />
        </ReachartBar>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
