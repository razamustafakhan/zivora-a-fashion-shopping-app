import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import React from "react";

const AdminLayout = () => {
  return (
    <div>
      <div className="admin flex">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="right">
          <Topbar />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
