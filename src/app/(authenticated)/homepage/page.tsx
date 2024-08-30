"use client";
import { Grid, Col, Form, Input, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json";
import LeftSide from "./components/LeftSide";
// import { messaging } from "@/utils/firebase";
import Task from "./components/Habit";
import Habit from "./components/Task";
import HabitHistory from "./components/HabitHistory";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import useFcmToken from "@/utils/hooks/useFCMToken";
import { useGetToDoList } from "./api";
import Reminder from "./components/Reminder";
const { useBreakpoint } = Grid;

const Page = () => {
  const screens = useBreakpoint();

  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { Search } = Input;
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const { data: toDoListData, isLoading } = useGetToDoList();

  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {});
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
    <div className="px-[5%]">
      {/* <FcmTokenComp /> */}

      <Header />
      <Row gutter={[16, 16]} justify="space-between" className="  w-full">
        <Col
          md={{ span: 6, order: 0 }}
          xs={{ span: 24, order: 1 }}
          // className="bg-white bg-opacity-10 rounded-lg h-fit p-2"
        >
          {" "}
          <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 ">
            <Typography className="text-md font-semibold">
              {fa.toDoList}
            </Typography>
            {toDoListData &&
              toDoListData.map((task, index) => (
                <Habit
                  key={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  deadline={task.deadline}
                  done={task.done}
                />
              ))}
          </div>
          <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 ">
            <Typography className="text-md font-semibold">
              عادت‌های امروز
            </Typography>
            <Reminder
              id={1}
              title={"Reminder1"}
              description={"Reminder1"}
              deadline="امروز 15:30"
            />
            <Reminder
              id={2}
              title={"Reminder2"}
              description={"Reminder2"}
              deadline="امروز 17:00"
            />
          </div>
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
          className="p-0"
          // className="bg-white bg-opacity-10 rounded-lg backdrop-blur-lg  h-fit"
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
