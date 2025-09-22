import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Fixed */}
      <div className="fixed top-0 left-0 h-full z-30">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Main Content - With offset for sidebar */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-background">
          <TopHeader />
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
