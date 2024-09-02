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
import type { Reminder, Task } from "../api/api.types";
import { formatDateToISOString } from "@/utils/dateUtils";
import { useCreateReminder, useCreateTask } from "../api";
import { toast } from "react-toastify";

const AddReminder = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createReminderMutate, isPending: isCreateReminderPending } =
    useCreateReminder();
  const [form] = Form.useForm();
  JalaliLocaleListener();

  const handleSuccess = () => {
    toast.success(globalFa.createdSuccessfully);
    form.resetFields();
    handleClose();
  };

  const handleFinish = (values: Reminder) => {
    const postData = {
      ...values,
      reminderTime: formatDateToISOString(values.reminderTime),
    };
    createReminderMutate(postData, {
      onSuccess:  handleSuccess,
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <Form
      form={form}
      title={fa.addReminder}
      onFinish={handleFinish}
      className="mt-5"
    >
      <Form.Item
        name="name"
        label={fa.name}
        rules={[{ required: true, message: globalFa.required }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label={fa.description}>
        <TextArea />
      </Form.Item>
      <Form.Item
        name="reminderTime"
        label={fa.deadline}
        rules={[{ required: true, message: globalFa.required }]}
      >
        <DatePickerJalali
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
          className="text-black w-full"
        />
      </Form.Item>
      <Form.Item name="notifBody" label={fa.notifBody}>
        <TextArea />
      </Form.Item>
      <Form.Item className="mt-5 flex w-full justify-end">
        <Button
          type="primary"
          htmlType="submit"
          disabled={isCreateReminderPending}
          icon={isCreateReminderPending && <Spin />}
        >
          {fa.submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddReminder;
