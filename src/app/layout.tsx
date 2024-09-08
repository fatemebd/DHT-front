"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { ConfigProvider } from "antd";
import faLocale from "antd/lib/locale/fa_IR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: never;
}>) {
  return (
    <html lang="fa">
      <head>
        <title>دوست</title>
        <link rel="icon" type="image/x-icon" href="/logo.png" />
      </head>
      <body
        dir="rtl"
        className="flex h-screen items-center justify-center bg-secondary-1000"
      >
        <ConfigProvider
          locale={faLocale}
          theme={{
            components: {
              Form: { labelColor: "#fff" },
              Menu: {
                darkItemSelectedBg: "transparent",
                darkItemSelectedColor: "rgba(115, 57, 237,  1)",
              },
              InputNumber: {
                colorText: "black",
              },
              Input: {
                colorText: "black",
              },
              Button: {
                colorText: "white",
                colorBgBase: "transparent",
                colorBgContainer: "transparent",
                colorTextDisabled: "#363d56",
                borderColorDisabled: "#363d56",
              },
              Modal: {
                contentBg: "#363d56",
                headerBg: "#363d56",
              },
              Dropdown: {
                colorBgElevated: "#363d56",
              },
              Table: {
                headerBg: "rgb(115,57,237)",
                colorBgContainer: "rgb(4,13,44)",
                headerColor: "rgba(255,255,255,0.88)",
                borderColor: "rgba(0,0,0,0.2)",
                colorText: "rgba(255,255,255,0.88)",
              },
              Tour: {
                colorBgElevated: "#363d56",
              },
              Empty: {
                colorTextDescription: "rgba(255,255,255,0.45)",
              },
            },

            token: {
              // Seed Token
              colorPrimary: "rgba(115, 57, 237,  1)",
              // colorBgBase:"rgba(4, 13, 44, 0.2)",
              fontFamily: "iranSans",
              colorSplit: "#fff",
              colorText: "#fff",
            },
          }}
        >
          <SessionProvider session={session}>
            <Head>
              <title>دوست</title>
            </Head>
            <ToastContainer theme="dark" />
            <QueryClientProvider>{children} </QueryClientProvider>
          </SessionProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
