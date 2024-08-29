"use client";
import { Grid, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json";
import LeftSide from "./components/LeftSide";
import Task from "./components/Task";
import Habit from "./components/Habit";
const { useBreakpoint } = Grid;

const Page = () => {
    const screens = useBreakpoint();

  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { Search } = Input;

  const handleSearch = (value: string) => {
    if (value) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        value
      )}`;
    }
  };
  return (
    <div className="px-[5%]">
      <Header />
      <Row
        gutter={[16, 16]}
        justify="space-between"
        className="  h-full w-full"
      >
        <Col
          md={{ span: 8, order: 0 }}
          xs={{ span: 24, order: 1 }}
          className="bg-white bg-opacity-10 rounded-lg"
        >
          <Habit />
          {/* to do list */}
          to do list
        </Col>
        <Col
          className="px-0"
          md={{ span: 7, order: 1 }}
          xs={{ span: 24, order: 0 }}
        >
          <Search
            placeholder={fa.googleSearch}
            allowClear
            enterButton={<SearchOutlined />}
            size={screens.xs? "small":"large"}
            onSearch={handleSearch}
            className="w-full h-fit p-0"
          />
        </Col>
        <Col
          md={{ span: 8, order: 2 }}
          xs={{ span: 24, order: 2 }}
          className="bg-white bg-opacity-10 rounded-lg backdrop-blur-lg"
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
