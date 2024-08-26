"use client";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Header from "./components/Header";
import { SearchOutlined } from "@ant-design/icons";
import fa from "./fa.json"
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
    <div className="px-40">
      <Header />
      <Row justify="space-between" className="  h-screen w-full">
        <Col md={6} className="bg-white opacity-10 rounded-lg">
          {/* to do list */}
          to do list
        </Col>
        <Col md={10}>
          <Search
            placeholder={fa.googleSearch}
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col md={6} className="bg-white opacity-10 rounded-lg">
          {/* mood tracker and habits*/}
          mood tracker
        </Col>
      </Row>
    </div>

    // <div>
    //   <button onClick={() => signOut()}>Sign out</button>
    // </div>
  );
};

export default Page;
