"use client"

import React, { useState } from 'react';

import { Button, Layout, Menu, theme } from 'antd';
import { MdChevronLeft } from 'react-icons/md';
import { sidebarItems } from './constants/sidebarMenu';
const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 return (
    <Layout className="bg-secondary-1000 h-full">
      <Sider trigger={null} collapsible collapsed={collapsed} className=" h-full w-fit relative bg-[#1E2642] ">
        <div className="demo-logo-vertical" />
          <label
      htmlFor="hamburgerMenu"
      onClick={() => setCollapsed(!collapsed)}
      className="group absolute left-1 top-0 z-50 flex cursor-pointer items-center justify-between px-2 py-10 transition-all duration-1000"
    >
      <div className="bg-slatw-200 absolute flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-secondary-1000 bg-[#1E2642]">
        <MdChevronLeft
          size={20}
          className={`text-gray-300 transition-transform duration-500 ease-linear ${
            collapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
    </label>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="bg-[#1E2642] h-full text-sm pt-5 "
          items={sidebarItems}
        />
      </Sider>
      <Layout className="bg-secondary-1000 m-6 space-y-5">
        <Header className="bg-[#1E2642] rounded-lg" >
         
        </Header>
        <Content
        className="bg-[#1E2642] "
          style={{
            padding: 24,
            minHeight: 280,
            background: "#1E2642",
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout