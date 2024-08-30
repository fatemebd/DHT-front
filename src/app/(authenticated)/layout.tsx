"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          // console.log("Registration successful, scope is:", registration.scope);
          // Checking for updates to the service worker immediately after registration
          registration
            .update()
            .then(() => {
              // console.log("Service worker updated");
            })
            .catch((err) => {
              console.error("Failed to update service worker:", err);
            });
        })
        .catch((err) => {
          console.error("Service worker registration failed, error:", err);
        });
    }
  }, []);
  const router = useRouter();
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("user");
    if (status === "unauthenticated" && user === null) {
      router.push("/login");
      return null; // Prevent further rendering
    }

    console.log(user);
  }
  // Redirect to login if not authenticated
  if (status === "loading") {
    return <Spin size="large" />;
  }

  return <main className="mx-3 mt-5 h-full w-full">{children}</main>;
};

export default AuthenticatedLayout;
