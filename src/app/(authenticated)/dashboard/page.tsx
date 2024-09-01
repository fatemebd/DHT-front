"use client";

import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default Page;
