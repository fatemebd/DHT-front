import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Row, Col, Typography, Tooltip } from "antd";
import jalaali from "jalaali-js";
import { convertGregorianToJalali } from "@/utils/dateUtils";

interface DataItem {
  date: string;
  value: number;
  jalaliDate: string;
  dayIndex: number;
}

const Home: NextPage = () => {
  const [data, setData] = useState([]);

  // Jalali weekdays starting with Saturday
  const jalaliWeekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  useEffect(() => {
    // Map your data and convert the dates
    const mappedData = [
      { date: "8/1/2023", value: 66 },
      { date: "8/2/2023", value: 1 },
      { date: "8/3/2023", value: 15 },
      { date: "8/4/2023", value: 50 },
      { date: "8/5/2023", value: 60 },
      { date: "8/6/2023", value: 24 },
      { date: "8/7/2023", value: 23 },
      { date: "8/8/2023", value: 68 },
      { date: "8/9/2023", value: 88 },
      { date: "8/10/2023", value: 10 },
      { date: "8/11/2023", value: 33 },
      { date: "8/12/2023", value: 44 },
      { date: "8/13/2023", value: 24 },
      { date: "8/14/2023", value: 71 },
      { date: "8/15/2023", value: 91 },
      { date: "8/16/2023", value: 0 },
      { date: "8/17/2023", value: 79 },
      { date: "8/18/2023", value: 63 },
      { date: "8/19/2023", value: 83 },
      { date: "8/20/2023", value: 67 },
      { date: "8/21/2023", value: 31 },
      { date: "8/22/2023", value: 71 },
      { date: "8/23/2023", value: 64 },
      { date: "8/24/2023", value: 22 },
      { date: "8/25/2023", value: 54 },
      { date: "8/26/2023", value: 94 },
      { date: "8/27/2023", value: 22 },
      { date: "8/28/2023", value: 98 },
      { date: "8/29/2023", value: 97 },
      { date: "8/30/2023", value: 81 },
    ]
    setData(mappedData);
  }, []);

  return (
    <div className="mt-4 w-full rounded-lg bg-white bg-opacity-5 p-3 pr-[15%] text-center">
      <Row
        // justify="center"
        gutter={[8, 8]}
        className="w-full text-center text-white"
      >
        {jalaliWeekdays.map((day) => (
          <Col key={day} span={3}>
            <Typography className="text-white">{day}</Typography>
          </Col>
        ))}
      </Row>

      {Array.from({ length: 5 }, (_, k) => k * 7).map((startIndex) => (
        <Row
          //   justify="center"
          key={startIndex}
          gutter={[16, 16]}
          wrap={true}
          className="w-full"
        >
          {data.slice(startIndex, startIndex + 7).map((item) => (
            <Tooltip key={`${item}`} title={convertGregorianToJalali(item.date)}>
              <Col span={3} className="flex w-full flex-col items-center">
                <div
                  className="m-0.5 h-8 w-full rounded-md sm:h-10 md:m-2 md:h-8"
                  style={{
                    backgroundColor: `rgba(115, 57, 237, ${item.value / 100})`,
                  }}
                />
              </Col>
            </Tooltip>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Home;
