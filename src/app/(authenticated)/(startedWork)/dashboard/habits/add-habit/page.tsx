"use client";

import {
  Form,
  Input,
  Button,
  Typography,
  Spin,
  InputNumber,
  Switch,
  Radio,
  type RadioChangeEvent,
} from "antd";
import fa from "../fa.json";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import coin from "../../../../../../../public/coin.png";
import Image from "next/image";
import { useCreateHabit } from "./api";
import type { CreatedHabit } from "./api/api.types";
import globalFa from "@/fa.json";
import { useState } from "react";
import { convertToSeconds } from "@/utils/timeUtils";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
const { TextArea } = Input;

const Page = () => {
  const [form] = Form.useForm();
  const [recurrenceFormat, setRecurrenceFormat] = useState<
    "s" | "m" | "h" | "d"
  >("s");

  const { mutate: createHabitMutate, isPending: isCreateHabitPending } =
    useCreateHabit();

  const router = useRouter();

  const onTimeFormatChange = (e: RadioChangeEvent) => {
    setRecurrenceFormat(e.target.value);
  };

  const handleActionSucceeded = () => {
    toast.success(globalFa.createdSuccessfully);
    form.resetFields();
    router.push("/dashboard/habits");
  };

  const handleActionFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    }
  };

  const onFinish = (values: CreatedHabit) => {
    const postData = {
      ...values,
      recurrenceSeconds: convertToSeconds(
        values.recurrenceSeconds,
        recurrenceFormat
      ),
    };
    createHabitMutate(postData, {
      onSuccess:  handleActionSucceeded,
      onError: handleActionFailed,
    });
  };

  return (
    <>
      <Typography className="text-xl mb-5">{fa.addHabit}</Typography>
      <Typography className="mb-5">{fa.explaination}</Typography>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="md:px-72 px-5 my-5 h-[90%] overflow-y-scroll"
        title={fa.addHabit}
      >
        <Form.Item
          name="name"
          label={fa.name}
          rules={[{ required: true, message: globalFa.required }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item name="description" label={fa.description}>
          <TextArea defaultValue="متن" allowClear />
        </Form.Item>

        <Form.Item name="score" label={fa.score} className="w-full">
          <InputNumber
            suffix={<Image alt="coin" src={coin} width={25} height={25} />}
            className="w-full"
            onChange={(e) => console.log(e)}
          />
        </Form.Item>
        <Form.Item name="isActive" label={fa.notifActive}>
          <Switch />
        </Form.Item>
        <Form.Item name="notifBody" label={fa.notifBody}>
          <TextArea allowClear />
        </Form.Item>
        <Typography className="mb-2">{fa.recurrenceSeconds}</Typography>
        <Radio.Group
          className="mb-3"
          onChange={onTimeFormatChange}
          value={recurrenceFormat}
        >
          <Radio value="s">{fa.second}</Radio>
          <Radio value="m">{fa.minute}</Radio>
          <Radio value="h">{fa.hour}</Radio>
          <Radio value="d">{fa.day}</Radio>
        </Radio.Group>
        <Form.Item name="recurrenceSeconds">
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item name="durationSeconds" label={fa.durationSeconds}>
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isCreateHabitPending}
            icon={isCreateHabitPending && <Spin />}
          >
            {fa.submitHabit}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Page;
