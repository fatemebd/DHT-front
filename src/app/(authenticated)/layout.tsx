"use client";

import React, { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { getTodayDate } from "@/utils/dateUtils";
import { isClient } from "@/utils/detectUtils";
interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
      // .then((registration) => {
      //   // console.log("Registration successful, scope is:", registration.scope);
      //   // Checking for updates to the service worker immediately after registration
      //   registration
      //     .update()
      //     .then(() => {
      //       // console.log("Service worker updated");
      //     })
      //     .catch(() => {
      //       // console.error("Failed to update service worker:", err);
      //     });
      // })
      // .catch(() => {
      //   // console.error("Service worker registration failed, error:", err);
      // });
    }
  }, []);

  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isClient()) {
      const user = localStorage.getItem("user");
      const startWork = localStorage.getItem("startWork");
      const todayDate = getTodayDate();

      if (user === null) {
        router.push("/login");
        // return null; // Prevent further rendering
      } else if (startWork !== todayDate) {
        router.push("/start-work");
      }
    }
    setIsLoading(false);
  }, []);

  // Redirect to login if not authenticated
  if (isLoading) {
    return <Spin size="large" />;
  }

  return <main className="h-full w-full">{children}</main>;
};

export default AuthenticatedLayout;
