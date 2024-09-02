"use client";
import { Grid, Col, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json";
import LeftSide from "./components/LeftSide";
import Task from "./components/Task";
import HabitHistory from "./components/HabitHistory";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import useFcmToken from "@/utils/hooks/useFCMToken";
import { useGetToDoList } from "./api";
import RightSide from "./components/RightSide";

const { useBreakpoint } = Grid;

const Page = () => {
  const screens = useBreakpoint();

  const { Search } = Input;
  const { fcmToken } = useFcmToken();

  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, () => {});
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  const handleSearch = (value: string) => {
    if (value) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        value
      )}`;
    }
  };
  const dataa = {
    id: 1,
    title: "task1",
    description: "des",
    done: true,
    deadline: "2024-08-28T23:55:10.242000Z",
  };
  return (
    <div className="px-[5%] flex flex-col h-lvh justify-between md:overflow-hidden">
      <Header />
      <Row gutter={[16, 16]} justify="space-between" className="w-full h-full">
        <Col
          md={{ span: 6, order: 0 }}
          xs={{ span: 24, order: 2 }}
          className="p-0 mb-3  md:h-dvh"
        >
          <RightSide />
        </Col>
        <Col
          className="px-0"
          md={{ span: 9, order: 1 }}
          xs={{ span: 24, order: 0 }}
        >
          <Search
            placeholder={fa.googleSearch}
            allowClear
            enterButton={<SearchOutlined />}
            size={screens.xs ? "small" : "large"}
            onSearch={handleSearch}
            className="h-fit w-full p-0 text-black"
          />
          <HabitHistory />
        </Col>
        <Col
          md={{ span: 8, order: 2 }}
          xs={{ span: 24, order: 1 }}
          className="p-0"
        >
          <LeftSide />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
