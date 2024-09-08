"use client";
import { Button, Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import fa from "./fa.json";
import { GithubOutlined } from "@ant-design/icons";
import Image from "next/image";
const { Paragraph } = Typography;
const { OTP } = Input;
import logo from "../../../public/logo.png";

import { usePostEmail, usePostOtp } from "./api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import type { User } from "@/@types/common";
import type { Response } from "@/@types/server";
import { isClient } from "@/utils/detectUtils";

const Page = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [form] = Form.useForm();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isClient()) {
      const user = localStorage.getItem("user");

      if (user) {
        router.push("/start-work");
      }
      setIsLoading(false);
    }
  }, []);

  const { mutate: postEmailMutate, isPending: isPostEmailPending } =
    usePostEmail();
  const { mutate: postOtpMutate, isPending: isPostOtpPending } = usePostOtp();

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

    if (isClient()) {
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/start-work");
    }
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
      { email: email.toLocaleLowerCase() },
      {
        onSuccess: handleEmailSentSuccess,
        onError: handleEmailSentFailed,
      }
    );
  };

  const handleGithubSignIn = async () => {
    // setLoadingSignIn(true); // Start loading
    // try {
    //   const res = await signIn("github");
    // } finally {
    //   setLoadingSignIn(false); // End loading
    // }
  };

  const handleOtp = () => {
    // signIn("credentials")
    postOtpMutate(
      { email: email.toLocaleLowerCase(), otp: otpCode },
      { onSuccess: handleOtpSentSuccess, onError: handleOtpSentFailed }
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Row
      justify="space-between"
      className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-full md:h-[70%] md:w-[60%] md:rounded-xl rounded-xl shadow-xl  text-white p-20 flex drop-shadow-2xl"
    >
      <Col md={15} xs={24}>
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
          {otpSent ? fa.signin : fa.sentOtp}
        </Button>
        <Divider>{fa.or}</Divider>
        <Button
          className=" w-full"
          icon={<GithubOutlined />}
          onClick={handleGithubSignIn}
          disabled={loadingSignIn}
        >
          {fa.signInWithGit}
        </Button>
      </Col>
      <Col md={6} xs={0}>
        <Image
          className="hidden md:flex "
          alt="Doost"
          height={400}
          width={200}
          src={logo}
        />
      </Col>
    </Row>
  );
};

export default Page;
