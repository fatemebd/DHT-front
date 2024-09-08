"use client";
import {
  Grid,
  Col,
  Input,
  Row,
  FloatButton,
  Tour,
  type TourProps,
  type InputRef,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
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
import { IoCloseOutline } from "react-icons/io5";

const { useBreakpoint } = Grid;

const Page = () => {
  const screens = useBreakpoint();

  const { Search } = Input;
  const { fcmToken } = useFcmToken();

  const searchRef = useRef<InputRef>(null);
  const scoreRef = useRef(null);
  const taskRef = useRef(null);
  const reminderRef = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "جستجوی گوگل",
      description:
        "اینجا صفحه اول مرورگرته پس میتونی هرچیزی که بخوای رو توی گوگل جستجو کنی!",

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      target: () => searchRef?.current?.input!,
    },
    {
      title: "اضافه کردن کار جدید",
      description:
        "اینجا میتونی یه کار جدید با توضیحات و ددلاین مشخص کنی تا همیشه جلوی چشمت باشه و فراموشش نکنی!",

      target: () => taskRef.current,
    },
    {
      title: "اضافه کردن یاداور جدید",
      description:
        "هر چیزی که ممکنه یادت بره رو اینجا اضافه کن تا ما بهت یاداوریش کنیم! مثل یه قرار مهم.",

      target: () => reminderRef.current,
    },
    {
      title: "اتمام کار",
      description: "وقتی کارت تموم شد از این جا میتونی خارج شی.",

      target: () => scoreRef.current,
    },
  ];

  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  const [open, setOpen] = useState(false);
  const [notifIds, setNotifIds] = useState<{
    habitId: number;
    habitInstanceId: number;
  }>();

  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

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
      <FloatButton
        onClick={() => setTourOpen(!tourOpen)}
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
      />
      <Tour
        closeIcon={<IoCloseOutline className="text-white " />}
        open={tourOpen}
        steps={steps}
        onFinish={() => setTourOpen(false)}
        onClose={() => setTourOpen(false)}
      />

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
      <Header
        refA={scoreRef}
        handleOpenExercise={() => setExerciseOpen(true)}
      />
      <Row gutter={[16, 16]} justify="space-between" className="w-full h-full">
        <Col
          md={{ span: 6, order: 0 }}
          xs={{ span: 24, order: 2 }}
          className="p-0 mb-3  md:h-dvh"
        >
          <RightSide taskRef={taskRef} reminderRef={reminderRef} />
        </Col>
        <Col
          className="px-0"
          md={{ span: 9, order: 1 }}
          xs={{ span: 24, order: 0 }}
        >
          <Input.Search
            ref={searchRef}
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
