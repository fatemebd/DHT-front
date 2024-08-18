"use client";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import fa from "./fa.json";

const Page = () => {
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();

  return (
    <div>
      <Modal className="items-end" title={fa.signin} open={signupModalOpen}>
        <Form form={form}>
          <Form.Item label={fa.email}>
            <Input
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setSignUpModalOpen(true)}>
        {" "}
        ثبت نام
      </Button>
    </div>
  );
};

export default Page;
