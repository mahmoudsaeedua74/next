"use client";

import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import BottomNav from "./BottomNav";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      <header className="">
        <TopNavbar
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          setIsOpen={setIsMobileSidebarOpen}
        />
      </header>
      <div className="hidden lg:block sticky top-0 z-50 bg-white">
        <BottomNav />
      </div>
    </>
  );
}
