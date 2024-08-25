"use client";

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null; // Prevent further rendering
  }

  return <main className="mx-3 mt-5 h-full w-full">{children}</main>;
};

export default AuthenticatedLayout;
