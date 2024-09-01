"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { ConfigProvider } from "antd";
import faLocale from "antd/lib/locale/fa_IR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html>
      <body
        dir="rtl"
        className="h-screen flex justify-center items-center bg-secondary-1000"
      >
        {" "}
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
            <ToastContainer theme="dark" />
            <QueryClientProvider>{children} </QueryClientProvider>
          </SessionProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
