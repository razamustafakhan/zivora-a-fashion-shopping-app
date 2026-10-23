import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import React from "react";

const AdminLayout = ({children}) => {
  return (
    <div>
      <div className="admin flex">
        <div className="sidebar flex-1">
          <Sidebar />
        </div>
        <div className="right flex-8">
          <Topbar />
          <div className="main">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
