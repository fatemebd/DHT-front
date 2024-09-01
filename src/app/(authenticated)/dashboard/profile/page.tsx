"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  DatePickerProps,
  Avatar,
  Typography,
  Spin,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import { convertJalaaliToGregorian } from "@/utils/dateUtils";
import fa from "./fa.json";
import { useGetUserDetail } from "../../api";
import { useUpdateUser } from "./api";
import { toast } from "react-toastify";
import { User } from "@/@types/common";
import { AxiosError } from "axios";
import globalFa from "@/fa.json";


const Page = () => {
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState("2024-9-1");
  const { data: user } = useGetUserDetail();

  const { mutate: updateUserMutate, isPending: isUserUpdatePending } =
    useUpdateUser();

  const onChange: DatePickerProps["onChange"] = (date) => {
    setBirthDate(convertJalaaliToGregorian(date.format("YYYY-MM-DD")));
  };

  useJalaliLocaleListener();

  useEffect(() => {
    form.setFieldsValue(user);
    setBirthDate(
      convertJalaaliToGregorian(
        user?.dateOfBirth.format("YYYY-MM-DD") || "2024-9-1"
      )
    );
  }, [user, form]);

  const handleActionFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    }
  };

  const onFinish = (values: Partial<User>) => {
    const data = {
      ...values,
      dateOfBirth: birthDate,
    };
    updateUserMutate(data, {
      onSuccess: () => toast.success(globalFa.updatedSuccessfully),
      onError: handleActionFailed,
    });
    console.log("Received values of form: ", data);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="md:px-72 px-5"
    >
      <div className="mb-8 flex items-center gap-5">
        <Avatar
          src={user?.picture}
          icon={user?.picture ? "" : <UserOutlined />}
          size={64}
          className="mb-2"
        />
        <div>
          <Typography>{user?.email}</Typography>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
        </div>
      </div>
      <Form.Item name="firstName" label={fa.firstName}>
        <Input/>
      </Form.Item>
      <Form.Item name="lastName" label={fa.lastName}>
        <Input/>
      </Form.Item>

      <Form.Item name="dateOfBirth" label={fa.birthDate}>
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
        <Button
          type="primary"
          htmlType="submit"
          disabled={isUserUpdatePending}
          icon={isUserUpdatePending && <Spin />}
        >
          {fa.edit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Page;
