"use client";

import { Modal, Table, Typography } from "antd";
import React, { useState } from "react";
import fa from "../fa.json";
import { useGetExerciseDetail, useGetExercisesList } from "../api";
import { tableColumns } from "../constants/exerciseColumn";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { GET_EXERCISE_DETAIL } from "../api/constants";

interface ExerciseProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseProps) => {
  const [exerciseId, setExerciseId] = useState<number>();

  const { data } = useGetExercisesList();
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { data: exercise } = useGetExerciseDetail(exerciseId!);
  const column = tableColumns({ setExerciseId });
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    if (typeof exerciseId === "number") {
      queryClient.invalidateQueries({
        queryKey: [GET_EXERCISE_DETAIL(exerciseId)],
        exact: true,
      });
      setExerciseId(undefined);
    } else {
      handleClose();
    }
  };

  const isGif = (mediaUrl: string) => {
    return mediaUrl?.toLowerCase().endsWith(".gif");
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      onCancel={handleCloseModal}
      className="md:w-[50%] w-full"
      title={fa.exercise}
      footer={null}
      closeIcon={<IoCloseOutline className="text-white " />}
    >
      {typeof exerciseId === "number" ? (
        <div className="flex flex-col items-center">
          {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
          {isGif(exercise?.media!) ? (
            <img
              alt={exercise?.name}
              src={exercise?.media}
              style={{ maxWidth: "100%", height: "auto" }}
              loading="lazy"
            />
          ) : (
            <Image
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              alt={exercise?.name!}
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              src={exercise?.media!}
              width={500}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Typography className="text-base font-normal mt-5">
            {exercise?.description}
          </Typography>
        </div>
      ) : (
        <Table pagination={false} dataSource={data} columns={column} />
      )}
    </Modal>
  );
};

export default ExerciseModal;
