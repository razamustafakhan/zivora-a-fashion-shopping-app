"use client";
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <p>Checking session...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/sign-in");
  }
  if (status === "authenticated" || session?.user.role !== "admin") {
    redirect("/");
  }

  if (session?.user?.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <div className="admin flex">
        <div className="sidebar flex-1">
          <Sidebar />
        </div>
        <div className="right flex-8">
          <Topbar />
          <div className="main">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
