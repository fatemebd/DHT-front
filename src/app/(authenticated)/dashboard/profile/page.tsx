"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  DatePickerProps,
  Avatar,
  Typography,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import { convertJalaaliToGregorian } from "@/utils/dateUtils";
import fa from "./fa.json";
import { useGetUserDetail } from "../../api";

interface CustomFormValues {
  name: string;
  birthdate: string; // Storing birthdate as a string in Jalali format
  avatar: any[]; // This would ideally have a more specific type
}

const Page = () => {
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState("");
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthDate(convertJalaaliToGregorian(date.format("YYYY-MM-DD")));
  };

  useJalaliLocaleListener();
  // Submit form data
  const onFinish = (values: CustomFormValues) => {
    const data = {
      ...values,
      birthdate: birthDate,
    };
    console.log("Received values of form: ", data);
  };
  const { data: user } = useGetUserDetail();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="md:px-72 px-5"
    >
      <div className="mb-10">
        <Avatar
          src={user?.picture}
          icon={user?.picture ? "" : <UserOutlined />}
          size={64}
          className="mb-2"
        />
        <Typography>{user?.email}</Typography>
      </div>
      <Form.Item name="name" label={fa.name}>
        <Input className="text-black" />
      </Form.Item>

      <Form.Item name="birthdate" label={fa.birthDate}>
        <DatePickerJalali onChange={onChange} className="text-black w-full" />
      </Form.Item>

      <Form.Item
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload
          disabled={!user?.allowedChangeProfile}
          className="rounded-full"
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          //   customRequest={dummyRequest}
        >
          {!form.getFieldValue("avatar") ||
          form.getFieldValue("avatar").length === 0 ? (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 0 }}>{fa.uploadProfile}</div>
            </div>
          ) : null}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {fa.edit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Page;
