import { Button, Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import type { Habit, Reminder } from "../api/api.types";
import { formatPersianDate } from "@/utils/dateUtils";
import { useDeleteReminder } from "../api";
import { FaRegTrashCan } from "react-icons/fa6";

const ReminderComponent = ({
  id,
  name,
  description,
  reminderTime,
}: Reminder) => {
  const [showContent, setShowContent] = useState(false);
  const { mutate: deleteReminderMutate, isPending: isDeleteReminderPending } =
    useDeleteReminder();

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
          <Typography className="text-gray-400 font-semibold text-end  text-[10px]">
            {formatPersianDate(reminderTime)}
          </Typography>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <IoNewspaper
          onClick={handleToggleContent}
          className="text-xs my-1 text-white opacity-15 cursor-pointer"
        />
        <Button
          className="text-xs p-0 bg-transparent rounded-full hover:bg-transparent opacity-85"
          type="text"
          danger
          onClick={() => deleteReminderMutate(id)}
        >
          <FaRegTrashCan className="text-xs" />
        </Button>
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

export default ReminderComponent;
