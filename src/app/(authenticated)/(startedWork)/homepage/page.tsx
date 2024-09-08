"use client";
import { Grid, Col, Input, Row, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
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
import { isClient } from "@/utils/detectUtils";
import { usePathname, useRouter } from "next/navigation";
import NotificationModal from "./components/Notification";
import Exercise from "./components/Exercise";

const { useBreakpoint } = Grid;

const Page = () => {
  const screens = useBreakpoint();

  const { Search } = Input;
  const { fcmToken } = useFcmToken();

  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  const [open, setOpen] = useState(false);
  const [notifIds, setNotifIds] = useState<{
    habitId: number;
    habitInstanceId: number;
  }>();

  const [exerciseOpen, setExerciseOpen] = useState(false);

  useEffect(() => {
    if (typeof notifIds?.habitId === "number") {
      setOpen(true);
    }
  }, [notifIds]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);

      // Listen for messages sent from Firebase Cloud Messaging
      const unsubscribe = onMessage(messaging, () => {});

      // Listen for messages sent from the service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        // biome-ignore lint/nursery/noConsole: <explanation>
        console.log("Message received from service worker:", event);
        setNotifIds({
          habitId:
            +event.data?.data?.habit_id ||
            +event.data?.notificationData?.data?.habit_id,
          habitInstanceId:
            +event.data?.data?.habit_instance ||
            +event.data?.notificationData?.data?.habit_instance,
        });
      });

      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
        navigator.serviceWorker.removeEventListener("message", () => {});
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

  return (
    <div className="px-[5%] flex flex-col h-lvh justify-between md:overflow-hidden">
      <NotificationModal
        open={open}
        onCancel={() => setOpen(false)}
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        ids={notifIds!}
      />
      <Exercise
        open={exerciseOpen}
        handleClose={() => setExerciseOpen(false)}
      />
      <Header handleOpenExercise={()=>setExerciseOpen(true)} />
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
