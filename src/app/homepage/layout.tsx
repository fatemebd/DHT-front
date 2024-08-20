"use client";

import { ConfigProvider } from "antd";
import faLocale from "antd/lib/locale/fa_IR";
import { ReactNode } from "react";



interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  
  return (
     <ConfigProvider
      direction="rtl"
      locale={faLocale}
      theme={{
        token: {
          // Seed Token
          colorPrimary: "rgba(115, 57, 237,  1)",
          fontFamily: "iranSans",
        },
      }}
    >  
      <main className="mx-3 mt-5 h-full w-full">{children}</main>
    </ConfigProvider>
  );
};

export default AuthenticatedLayout;
