"use client";
import { useRouter } from "next/navigation";
import { getTodayDate } from "@/utils/dateUtils";
import type { ReactNode } from "react";
import { isClient } from "@/utils/detectUtils";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (isClient()) {
    const startWork = localStorage.getItem("startWork");
    const todayDate = getTodayDate();

    if (startWork !== todayDate) {
      router.push("/start-work");
    }
  }
  return <>{children}</>;
};

export default Layout;
