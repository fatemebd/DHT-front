"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { ConfigProvider } from "antd";
import faLocale from "antd/lib/locale/fa_IR";

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
        className="h-screen flex justify-center items-center bg-gray-100"
      >
        {" "}
        <ConfigProvider
          locale={faLocale}
          theme={{
            components: {
              Form: { labelColor: "#fff" },
            },
            token: {
              // Seed Token
              colorPrimary: "rgba(115, 57, 237,  1)",
              fontFamily: "iranSans",
              colorSplit: "#fff",
              colorText: "#fff",
            },
          }}
        >
          <SessionProvider session={session}>
            <QueryClientProvider>{children} </QueryClientProvider>
          </SessionProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
