"use client";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

const Page = () => {
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Page;
