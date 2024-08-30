"use client";
import { Grid, Col, Form, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json";
import LeftSide from "./components/LeftSide";
// import { messaging } from "@/utils/firebase";
import Task from "./components/Task";
import Habit from "./components/Habit";
import HabitHistory from "./components/HabitHistory";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import useFcmToken from "@/utils/hooks/useFCMToken";
const { useBreakpoint } = Grid;

const Page = () => {
  const screens = useBreakpoint();

  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { Search } = Input;
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log("FCM token:", notificationPermissionStatus);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
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
  // console.log(messaging);

  // requestUserPermission(messaging);
  interface HabitProps {
    id: number;
    title: string;
    description: string;
    done: boolean;
    deadline: string;
  }
  const dataa: HabitProps = {
    id: 1,
    title: "task1",
    description: "des",
    done: true,
    deadline: "2024-08-28T23:55:10.242000Z",
  };
  return (
    <div className="px-[5%]">
      {/* <FcmTokenComp /> */}

      <Header />
      <Row gutter={[16, 16]} justify="space-between" className="  w-full">
        <Col
          md={{ span: 6, order: 0 }}
          xs={{ span: 24, order: 1 }}
          className="bg-white bg-opacity-10 rounded-lg h-fit"
        >
          <Habit
            id={dataa.id}
            title={dataa.title}
            description={dataa.description}
            deadline={dataa.deadline}
            done={dataa.done}
          />
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
            className="w-full h-fit p-0 text-black"
          />
          <HabitHistory />
        </Col>
        <Col
          md={{ span: 8, order: 2 }}
          xs={{ span: 24, order: 2 }}
          className="bg-white bg-opacity-10 rounded-lg backdrop-blur-lg  h-fit"
        >
          <LeftSide />
        </Col>
      </Row>
    </div>

    // <div>
    //   <button onClick={() => signOut()}>Sign out</button>
    // </div>
  );
};

export default Page;
