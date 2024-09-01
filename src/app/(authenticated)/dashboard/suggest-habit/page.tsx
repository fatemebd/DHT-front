"use client";

import { Form, Input, Button, Typography, Spin, InputNumber } from "antd";
import fa from "./fa.json";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import coin from "../../../../../public/coin.png.png";
import Image from "next/image";
import { useCreateSuggestion } from "./api";
import { Suggestion } from "./api/api.types";
import globalFa from "@/fa.json";
const { TextArea } = Input;

const Page = () => {
  const [form] = Form.useForm();

  const {
    mutate: createSuggestionMutate,
    isPending: isCreateSuggestionPending,
  } = useCreateSuggestion();

  const handleActionFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    }
  };

  const onFinish = (values: Suggestion) => {
    createSuggestionMutate(values, {
      onSuccess: () => toast.success(globalFa.createdSuccessfully),
      onError: handleActionFailed,
    });
  };

  return (
    <>
      <Typography className="text-xl mb-5">{fa.suggestHabit}</Typography>
      <Typography className="mb-5">{fa.explaination}</Typography>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="md:px-72 px-5 "
        title={fa.suggestHabit}
      >
        <Form.Item
          name="name"
          label={fa.name}
          rules={[{ required: true, message: fa.required }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item name="description" label={fa.description}>
          <TextArea allowClear />
        </Form.Item>
        <Form.Item name="score" label={fa.score}>
          <div className="flex gap-2">
            <InputNumber className="w-full" />
            <Image alt="coin" src={coin} width={30} height={30} />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isCreateSuggestionPending}
            icon={isCreateSuggestionPending && <Spin />}
          >
            {fa.submitSuggestion}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Page;
