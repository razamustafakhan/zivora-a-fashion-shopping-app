"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";

const AdminLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [status, session, router]);

  // Render a loading state only while authentication is unresolved.
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f3]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e8e2d7] border-t-[#a58a65]" />
          <p className="text-sm text-[#827b70]">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return null;
  }

  if (session?.user?.role !== "admin") {
    return <p>Checking admin access...</p>;
  }

  return (
    <div className="admin flex">
      {" "}
      <div className="sidebar flex-1 w-[300px]">
        {" "}
        <Sidebar />{" "}
      </div>{" "}
      <div className="right flex-6">
        {" "}
        <Topbar /> <div className="main">{children}</div>{" "}
      </div>{" "}
    </div>
  );
};

export default AdminLayout;
