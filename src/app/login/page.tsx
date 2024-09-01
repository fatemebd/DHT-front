"use client";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import fa from "./fa.json";
import { signIn, useSession } from "next-auth/react";
import { GithubOutlined } from "@ant-design/icons";
import Image from "next/image";
import { redirect } from "next/navigation";
const { Paragraph } = Typography;
const { OTP } = Input;
import logo from "../../../public/logo.png";

import { usePostEmail, usePostOtp } from "./api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/@types/common";
import { Response } from "@/@types/server";

const Page = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const user = localStorage.getItem("user");

  const { mutate: postEmailMutate, isPending: isPostEmailPending } =
    usePostEmail();
  const { mutate: postOtpMutate, isPending: isPostOtpPending } = usePostOtp();
  const router = useRouter();

  if (status === "authenticated" || user) {
    router.push("/homepage");
    return null;
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

  const handleOtpSentSuccess = (res: Response<User>) => {
    toast.success(fa.otpSentSuccess);
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(res);
    router.push("/homepage");
  };

  const handleOtpSentFailed = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  };

  const handleSendEmail = () => {
    postEmailMutate(
      { email: email },
      {
        onSuccess: handleEmailSentSuccess,
        onError: handleEmailSentFailed,
      }
    );
  };

  const handleGithubSignIn = async () => {
    setLoadingSignIn(true); // Start loading
    try {
      const res = await signIn("github");
    } finally {
      setLoadingSignIn(false); // End loading
    }
  };

  const handleOtp = () => {
    // signIn("credentials")
    postOtpMutate(
      { email: email, otp: otpCode },
      { onSuccess: handleOtpSentSuccess, onError: handleOtpSentFailed }
    );
  };

  return (
    <Row
      justify="space-between"
      className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-full md:h-[70%] md:w-[60%] md:rounded-xl rounded-xl shadow-xl  text-white p-20 flex drop-shadow-2xl"
    >
      <Col md={15}>
        {otpSent ? (
          <Typography>{fa.otpText}😍</Typography>
        ) : (
          <Typography>
            <Paragraph>{fa.hello}! :)</Paragraph>
            <Paragraph>{fa.welcome}</Paragraph>
            <Paragraph>{fa.thanks}😍</Paragraph>
          </Typography>
        )}
        <Form layout="vertical" form={form} className="w-full mt-5">
          {otpSent ? (
            <Form.Item label={fa.otp} className="w-ful">
              <OTP
                dir="ltr"
                length={6}
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(otp) => setOtpCode(otp)}
              />
            </Form.Item>
          ) : (
            <Form.Item label={fa.email}>
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
          )}
        </Form>
        <Button
          className="w-full"
          type="primary"
          onClick={otpSent ? handleOtp : handleSendEmail}
          disabled={isPostEmailPending || isPostOtpPending}
        >
          {otpSent ? fa.sentOtp : fa.signin}
        </Button>
        <Divider>{fa.or}</Divider>
        <Button
          className=" w-full"
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
