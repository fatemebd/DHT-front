"use client";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import fa from "./fa.json";
import { signIn } from "next-auth/react";
import { GithubOutlined } from "@ant-design/icons";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const { Title, Paragraph, Text, Link } = Typography;
const { OTP } = Input;
import logo from "../../../public/logo.png";
import { usePostEmail } from "./api";
import { PreSignup } from "./api/api.types";
import { initialEmail } from "./constants/initialEmail";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Page = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState<PreSignup>(initialEmail);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const [form] = Form.useForm();
  const { data: session } = useSession();
  const { mutate: postEmailMutate, isPending: isPostEmailPending } =
    usePostEmail();

  if (session) {
    redirect("/homepage");
  }
  const handleEmailSentSuccess = () => {
    toast.success(fa.emailSentSuccess);
    setOtpSent(true);
  };
  const handleEmailSentFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  };
  const handleSendEmail = () => {
    postEmailMutate(email, {
      onSuccess: handleEmailSentSuccess,
      onError: handleEmailSentFailed,
    });
  };

  const handleGithubSignIn = async () => {
    setLoadingSignIn(true); // Start loading
    try {
      const response = await signIn("github");
    } finally {
      setLoadingSignIn(false); // End loading
    }
  };

  const handleOtp = () => {};

  return (
    <Row
      justify="space-between"
      className="bg-white   bg-opacity-10 backdrop-blur-lg w-full h-full md:h-auto md:w-[60%] md:rounded-xl rounded-xl shadow-xl  text-white p-20 flex drop-shadow-2xl"
    >
      <Col md={16}>
        <Typography>
          <Paragraph>{fa.hello}! :)</Paragraph>
          <Paragraph>{fa.welcome}</Paragraph>
          <Paragraph> {fa.thanks}😍</Paragraph>
        </Typography>
        <Form layout="vertical" form={form} className="w-full">
          {!otpSent ? (
            <Form.Item label={fa.otp} className="w-full">
              <OTP
                length={6}
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => console.log(e)
                }
              />
            </Form.Item>
          ) : (
            <Form.Item label={fa.email}>
              <Input
                className="text-black"
                onChange={(e) => setEmail({ email: e.target.value })}
              />
            </Form.Item>
          )}
        </Form>
        {/* </Modal> */}
        <Button
          className="w-full"
          type="primary"
          onClick={otpSent ? handleOtp : handleSendEmail}
        >
          {fa.signin}
        </Button>
        <Divider >{fa.or}</Divider>
        <Button
          className="text-black w-full"
          icon={<GithubOutlined />}
          onClick={handleGithubSignIn}
          disabled={loadingSignIn}
        >
          {fa.signInWithGit}{" "}
        </Button>
      </Col>
      <Col md={6}>
        <Image className="hidden md:flex " alt="Doost" fill={true} src={logo} />
      </Col>
    </Row>
  );
};

export default Page;
