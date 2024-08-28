"use client";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json";
import LeftSide from "./components/LeftSide";
const Page = () => {
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
          md={{ span: 6, order: 0 }}
          xs={{ span: 24, order: 1 }}
          className="bg-white opacity-10 rounded-lg"
        >
          {/* to do list */}
          to do list
        </Col>
        <Col
          className="px-0"
          md={{ span: 11, order: 1 }}
          xs={{ span: 24, order: 0 }}
        >
          <Search
            placeholder={fa.googleSearch}
            allowClear
            enterButton={<SearchOutlined />}
            // size="large"
            onSearch={handleSearch}
            className="w-full h-fit p-0"
          />
        </Col>
        <Col
          md={{ span: 6, order: 2 }}
          xs={{ span: 24, order: 2 }}
          className="bg-white opacity-10 rounded-lg "
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
