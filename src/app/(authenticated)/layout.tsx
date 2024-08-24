"use client"
import React, { ReactNode } from 'react'
import {  useSession } from "next-auth/react";
import { redirect } from "next/navigation";



interface LayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: LayoutProps) => {
    const { data: session } = useSession();
    if (session === null) {
      redirect("/login");
    }
  return <main className="mx-3 mt-5 h-full w-full">{children}</main>;
};

export default AuthenticatedLayout;
