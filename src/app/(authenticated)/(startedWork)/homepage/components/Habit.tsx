import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import type { Habit } from "../api/api.types";

const HabitComponent = ({ name, description }: Habit) => {
  const [showContent, setShowContent] = useState(false);

  const handleToggleContent = () => {
    setShowContent(!showContent);
  };
  return (
    <div className="bg-white bg-opacity-20 rounded-md m-3 py-1 px-2 ">
      <Row justify="space-between" align="middle">
        <Col span={8} className="flex items-center gap-2">
          {/* <Checkbox checked={done} disabled={done} /> */}
          <Typography className={"text-white"}>{name}</Typography>
        </Col>

        <Col span={8}>
          <Typography className="text-gray-700 font-semibold text-end  text-[10px]">
            {/* {getFormattedDateTime(deadline)} */}
          </Typography>
        </Col>
      </Row>
      <Row>
        <IoNewspaper
          onClick={handleToggleContent}
          className="text-xs my-1 text-white opacity-15 cursor-pointer"
        />
      </Row>
      <Row
        className={twMerge(
          showContent ? "flex opacity-100" : "hidden opacity-0",
          "border border-secondary-400 p-0.5 rounded"
        )}
      >
        <Typography className="text-gray-400 text-xs">{description}</Typography>
      </Row>
    </div>
  );
};

export default HabitComponent;
