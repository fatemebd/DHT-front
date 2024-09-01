"use client";

import {
  Form,
  Input,
  Button,
  Typography,
  Spin,
  InputNumber,
  Switch,
} from "antd";
import fa from "./fa.json";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import coin from "../../../../../public/coin.png.png";
import Image from "next/image";
import { useCreateHabit } from "./api";
import { CreatedHabit } from "./api/api.types";
import globalFa from "@/fa.json";
import { jalaaliWeekdays } from "jalaali-js";
const { TextArea } = Input;

const Page = () => {
  const [form] = Form.useForm();

  const { mutate: createHabitMutate, isPending: isCreateHabitPending } =
    useCreateHabit();

  const handleActionFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    }
  };

  const onFinish = (values: CreatedHabit) => {
    createHabitMutate(values, {
      onSuccess: () => toast.success(globalFa.createdSuccessfully),
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
        <Form.Item name="recurrenceSeconds" label={fa.recurrenceSeconds}>
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
