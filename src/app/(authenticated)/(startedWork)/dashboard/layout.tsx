"use client";

import React, { type ReactNode, useState } from "react";
import { Button, Layout, Menu, theme, Typography } from "antd";
import { MdChevronLeft } from "react-icons/md";
import { sidebarItems } from "./constants/sidebarMenu";
import Score from "@/components/Score";
import fa from "./fa.json";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserDetail } from "../api";
import LeftHabits from "@/components/LeftHabits";
import Link from "next/link";
const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    router.push("/dashboard/profile");
  }

  const handleRedirect = (href: string) => {
    const formattedHref = href.startsWith("/") ? href : `/dashboard/${href}`;
    router.replace(formattedHref);
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { data: user } = useGetUserDetail();

  return (
    <Layout className="bg-secondary-1000 h-full">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className=" h-full w-fit relative bg-[#1E2642] "
      >
        <Button>
          <Link href={"/homepage"}>fhkvbj</Link>
        </Button>
        <div className="demo-logo-vertical" />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
          defaultSelectedKeys={["profile"]}
          className="bg-[#1E2642] h-full text-sm pt-5 space-y-5 "
          items={sidebarItems}
          onClick={(e) => handleRedirect(e.key)}
          selectedKeys={[pathname.split("/")[2]]}
        />
      </Sider>
      <Layout className="bg-secondary-1000 m-6 space-y-5">
        <Header className="bg-[#1E2642] rounded-lg p-3 flex justify-between items-center shadow-lg">
          <Typography>
            {fa.hello} {user?.firstName ? user.firstName : fa.friend} {fa.dear}{" "}
            !
          </Typography>
          <div className="flex gap-3">
            <Score score={user?.score} />
            <LeftHabits leftHabits={user?.allowedHabitsCount} />
          </div>
        </Header>
        <Content
          className="bg-[#1E2642] shadow-lg pb-15"
          style={{
            padding: 24,
            minHeight: 280,
            background: "#1E2642",
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
