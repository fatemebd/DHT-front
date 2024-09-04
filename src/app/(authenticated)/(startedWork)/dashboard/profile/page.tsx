"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  type DatePickerProps,
  Avatar,
  Typography,
  message,
  Spin,
  Modal,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import { convertJalaaliToGregorian } from "@/utils/dateUtils";
import fa from "./fa.json";
import { useUpdateUser, useUpdateUserPic } from "./api";
import { toast } from "react-toastify";
import type { User } from "@/@types/common";
import { AxiosError } from "axios";
import globalFa from "@/fa.json";
import { useGetUserDetail } from "../../api";
import { MdEdit } from "react-icons/md";
const { Dragger } = Upload;
import type { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { IoCloseOutline } from "react-icons/io5";

const Page = () => {
  useJalaliLocaleListener();

  const [form] = Form.useForm();

  const [birthDate, setBirthDate] = useState("2024-9-1");
  const [profileModal, setProfileModal] = useState(false);

  const { data: user } = useGetUserDetail();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate: updateUserMutate, isPending: isUserUpdatePending } =
    useUpdateUser();

  const { mutate: updateUserPicMutate, isPending: isUserPicUpdatePending } =
    useUpdateUserPic();

  const onChange: DatePickerProps["onChange"] = (date) => {
    setBirthDate(convertJalaaliToGregorian(date.format("YYYY-MM-DD")));
  };

  useEffect(() => {
    form.setFieldsValue(user);
    setBirthDate(
      convertJalaaliToGregorian(
        user?.dateOfBirth.format("YYYY-MM-DD") || "2024-9-1"
      )
    );
  }, [user, form]);

  const handleOpenModal = () => {
    setProfileModal(true);
  };

  const handleCloseModal = () => {
    onRemovePic();
    setProfileModal(false);
  };

  const handleActionFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    }
  };

  const handleActionSucceeded = () => {
    toast.success(globalFa.updatedSuccessfully);
    handleCloseModal();
  };

  const onFinish = (values: Partial<User>) => {
    const data = {
      ...values,
      dateOfBirth: birthDate,
    };
    updateUserMutate(data, {
      onSuccess: handleActionSucceeded,
      onError: handleActionFailed,
    });
  };

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (fileList.length >= 1) {
      message.error("You can only upload one file");
      return false;
    }
    setFileList([file]);
    return false; // Prevent auto upload
  };

  const onRemovePic = () => {
    setFileList([]);
  };

  const handleChangeProfile = () => {    
    if (fileList[0]) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      updateUserPicMutate(fileList[0] as any as File, {
        onError: handleActionFailed,
        onSuccess: handleActionSucceeded,
      });
    }
  };

  return (
    <>
      <Modal
        closeIcon={<IoCloseOutline className="text-white " />}
        title={fa.uploadProfile}
        open={profileModal}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        okButtonProps={{
          icon: isUserPicUpdatePending && <Spin />,
          disabled:isUserPicUpdatePending
        }}
        onOk={handleChangeProfile}
      >
        <Dragger
          accept=".png,.jpg,.jpeg"
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={onRemovePic}
          multiple={false}
          showUploadList={{
            showRemoveIcon: true,
          }}
          className=" hover:text-primary-1000 duration-[0.3s]"
        >
          <div className="flex flex-col gap-3 items-center my-5 ">
            <UploadOutlined />
            {fa.dragDrop}
          </div>
        </Dragger>
      </Modal>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="md:px-72 px-5"
      >
        <div className="mb-8 flex items-center gap-5">
          <div className="w-fit relative">
            <Avatar
              src={user?.picture}
              icon={user?.picture ? "" : <UserOutlined />}
              size={72}
              className="mb-2"
            />
            <Button
              icon={<MdEdit className="text-white text-sm" />}
              type="primary"
              // onClick={handleOpenModal}
              className="absolute top-14 left-1 z-50 w-6 h-6 rounded-full p-0"
              disabled={!user?.allowedChangeProfile}
              onClick={user?.allowedChangeProfile ? handleOpenModal : undefined}
            />
          </div>
          <div>
            <Typography>{user?.email}</Typography>
            <Typography>
              {user?.firstName} {user?.lastName}
            </Typography>
          </div>
        </div>
        <Form.Item name="firstName" label={fa.firstName}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label={fa.lastName}>
          <Input />
        </Form.Item>

        <Form.Item name="dateOfBirth" label={fa.birthDate}>
          <DatePickerJalali onChange={onChange} className="text-black w-full" />
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
    </>
  );
};

export default Page;
