"use client";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useState } from "react";
import fa from "./fa.json";
import { signIn } from "next-auth/react";
import { GithubOutlined } from "@ant-design/icons";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const { Title, Paragraph, Text, Link } = Typography;
import logo from "../../../public/logo.png";
const Page = () => {
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { data: session } = useSession();
  if (session) {
    redirect("/homepage");
  }
  return (
    <Row justify="space-between" className="bg-secondary-1000 w-full h-full md:h-auto md:w-[60%] md:rounded-xl  text-white p-20 flex drop-shadow-2xl">
      <Col md={16}>
        <Typography>
          <Paragraph>سلام! :)</Paragraph>
          <Paragraph>
            به دوست خوش اومدی برای وارد شدن یا ثبت نام، کافیه ایمیلتو وارد کنی
            البته به راحتی می‌تونی با اکانت گیتهابت ادامه بدی!
          </Paragraph>
          <Paragraph>ممنون که دوست رو انتخاب کردی 😍</Paragraph>
        </Typography>
        <Form layout="vertical" form={form} className="w-full">
          <Form.Item label={fa.email}>
            <Input
              className="text-black"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Item>
        </Form>
        {/* </Modal> */}
        <Button
          className="w-full"
          type="primary"
          onClick={() => setSignUpModalOpen(true)}
        >
          {fa.signin}{" "}
        </Button>
        <Divider>{fa.or}</Divider>
        <Button
          className="text-black w-full"
          icon={<GithubOutlined />}
          onClick={() => signIn("github")}
        >
          {fa.signInWithGit}{" "}
        </Button>
      </Col>
      <Col md={6}>
        <Image
          className="hidden md:flex "
          // objectFit="crop"
          alt="Doost"
          // width={100}
          // height={100}
          fill={true}
          src={logo}
        />
      </Col>
    </Row>
  );
};

export default Page;
