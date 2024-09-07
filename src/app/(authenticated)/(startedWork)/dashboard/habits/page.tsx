"use client";

import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useGetHabitsList } from "./api";
import { tableColumns } from "./constants/tableColumn";
import fa from "./fa.json";

const Page = () => {
  const router = useRouter();
  const { data: habitsList } = useGetHabitsList();

  const columns = tableColumns();

  return (
    <div className="space-y-10 px-4 ">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-bold text-2xl">{fa.habits}</h3>
        </div>
        <Button
          type="primary"
          className="flex-row-reverse rounded-lg px-4 py-5"
          onClick={() => router.push("/dashboard/habits/add-habit")}
          icon={<FaPlus />}
        >
          {fa.addHabit}{" "}
        </Button>
      </div>
      <Table
        /* biome-ignore lint/style/noNonNullAssertion: <explanation> */
        dataSource={habitsList!}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Page;
