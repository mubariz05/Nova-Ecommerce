import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Sidebar from "../components/account/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function getInitialSidebarState() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);

  return (
    <div className="main-layout flex min-h-screen flex-col bg-[#fafafa] font-sans">
      <Header />

      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label={sidebarOpen ? "Sidebar-ı bağla" : "Sidebar-ı aç"}
        aria-expanded={sidebarOpen}
        className={[
          "fixed top-20 sm:top-[84px] z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-nova-black shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50",
          sidebarOpen ? "left-[232px]" : "left-3",
        ].join(" ")}
      >
        {sidebarOpen ? (
          <PanelLeftClose size={18} strokeWidth={1.8} />
        ) : (
          <PanelLeftOpen size={18} strokeWidth={1.8} />
        )}
      </button>

      <div className="flex min-h-0 flex-1 mt-16 sm:mt-[72px]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col transition-[margin,padding] duration-300 ease-in-out">
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
