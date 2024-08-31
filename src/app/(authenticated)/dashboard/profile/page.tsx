import { Form } from "antd";
import React from "react";
const { useForm } = Form;
const Page = () => {
  const [form] = useForm();
  return <Form form={form}>
    
  </Form>;
};

export default Page;
