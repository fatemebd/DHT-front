import { Button, Form, Input, Spin } from "antd";
import React from "react";
const { TextArea } = Input;
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import globalFa from "@/fa.json";

import fa from "../fa.json";
import dayjs from "dayjs";
import type { Task } from "../api/api.types";
import { formatDateToISOString } from "@/utils/dateUtils";
import { useCreateTask } from "../api";
import { toast } from "react-toastify";

const AddTask = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createTaskMutate, isPending: isCreateTaskPending } =
    useCreateTask();
    const [form] = Form.useForm()

  JalaliLocaleListener();

  const handleSuccess = () => {
    toast.success(globalFa.createdSuccessfully);
    form.resetFields()
    handleClose();
  };

  const handleFinish = (values: Task) => {
    const postData = {
      ...values,
      deadline: formatDateToISOString(values.deadline),
    };
    createTaskMutate(postData, {
      onSuccess:  handleSuccess,
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <Form
      form={form}
      title={fa.addTask}
      onFinish={handleFinish}
      className="mt-5"
    >
      <Form.Item
        name="title"
        label={fa.title}
        rules={[{ required: true, message: globalFa.required }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label={fa.description}>
        <TextArea />
      </Form.Item>
      <Form.Item
        name="deadline"
        label={fa.deadline}
        rules={[{ required: true, message: globalFa.required }]}
      >
        <DatePickerJalali
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
          className="text-black w-full"
        />
      </Form.Item>
      <Form.Item className="mt-5 flex w-full justify-end">
        <Button
          type="primary"
          htmlType="submit"
          disabled={isCreateTaskPending}
          icon={isCreateTaskPending && <Spin />}
        >
          {fa.submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTask;
