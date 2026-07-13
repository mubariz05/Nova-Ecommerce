import { useState } from "react";
import { Outlet } from "react-router-dom";
import AccountFooter from "../components/account/AccountFooter";
import Sidebar from "../components/account/Sidebar";
import TopHeaderBar from "../components/account/TopHeaderBar";

function getInitialSidebarState() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function AccountLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);

  return (
    <div className="account-layout flex min-h-screen flex-col bg-[#fafafa] font-sans">
      <TopHeaderBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col transition-[margin,padding] duration-300 ease-in-out">
          <div className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
            <Outlet />
          </div>
          <AccountFooter />
        </div>
      </div>
    </div>
  );
}
