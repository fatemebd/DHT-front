"use client";

import { Modal, Statistic, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useChangeHabitStatus, useGetHabitDetail } from "../api";
import fa from "../fa.json";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { RxCountdownTimer } from "react-icons/rx";

const { Countdown } = Statistic;
interface NotificationModalProps {
  open: boolean;
  onCancel: () => void;
  id: number;
}

const NotificationModal = ({ open, onCancel, id }: NotificationModalProps) => {
  const [deadline, setDeadline] = useState();
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { data } = useGetHabitDetail(id!);
  const {
    mutate: changeHabitStatusMutate,
    isPending: isChangingStatusPending,
  } = useChangeHabitStatus();

  //   useEffect(() => {
  //     if (data?.durationSeconds) {
  //       const temp = new Date(data?.durationSeconds * 1000);
  //       setDeadline(temp);
  //     } else {
  //       const temp = new Date(0);
  //       setDeadline(temp);
  //     }
  //   }, [data]);

  const handleDoneSuccess = () => {
    toast.success("عادت با موفقیت انجام شد");
    onCancel();
  };

  const handleDoneHabit = () => {
    changeHabitStatusMutate(
      { id: id, data: { status: "DONE" } },
      {
        onSuccess: handleDoneSuccess,
      }
    );
  };

  const handleUnDoneHabit = () => {
    changeHabitStatusMutate(
      { id: id, data: { status: "UNDONE" } },
      { onSuccess: onCancel }
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        handleUnDoneHabit;
      }, data?.durationSeconds);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open]);
  return (
    <Modal
      closeIcon={<IoCloseOutline className="text-white " />}
      open={open}
      onCancel={handleUnDoneHabit}
      onOk={handleDoneHabit}
      maskClosable={false}
      title={data?.name}
      okText={fa.IDid}
      cancelText={fa.IDidNot}
    >
      <Typography className="my-5">{fa.notifText}</Typography>
      <Countdown
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        // value={data?.durationSeconds!}
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        value={Date.now() + data?.durationSeconds! * 1000 }
        format="ss:SSS"
      />
    </Modal>
  );
};

export default NotificationModal;
