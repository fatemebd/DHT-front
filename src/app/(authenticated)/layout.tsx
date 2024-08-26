"use client";

import React, { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const user = localStorage.getItem("user");
  const router = useRouter();

  // Redirect to login if not authenticated
  if (status === "loading") {
    return <Spin size="large" />;
  }
  console.log(user);

  if (status === "unauthenticated" && user === null) {
    router.push("/login");
    return null; // Prevent further rendering
  }

  return <main className="mx-3 mt-5 h-full w-full">{children}</main>;
};

export default AuthenticatedLayout;
