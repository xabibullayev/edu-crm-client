"use client";
import React from "react";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenwidth] = useState<number>(window.innerWidth);
  const pathname = usePathname();
  const sidebarRef = useRef<any>();

  // Resize screen width
  useLayoutEffect(() => {
    function updateSize() {
      setScreenwidth(window.innerWidth);
    }

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [screenWidth]);

  // If screen widht less than 1024 sidebar must be unvisible for default
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [screenWidth]);

  // Close sidebar when screen width less than 1024 and click outside of sidebar
  useEffect(() => {
    document.addEventListener(
      "click",
      (e: any) => {
        if (
          window.innerWidth < 1024 &&
          !sidebarRef?.current.contains(e.target)
        ) {
          setIsSidebarOpen(false);
        }
      },
      true
    );
  }, [screenWidth]);

  // Styles for main div when sidebar open and close
  const styles = {
    openedSidebar:
      "bg-bg-gray w-full min-h-screen ml-0 lg:ml-[280px] transition-all duration-300 ease",
    closedSidebar:
      "bg-bg-gray w-full min-h-screen ml-0 transition-all duration-300 ease",
  };

  return (
    <>
      {pathname === "/login" ? (
        <>{children}</>
      ) : (
        <div className="flex w-full min-h-screen bg-bg-gray">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            screenWidth={screenWidth}
            ref={sidebarRef}
          />

          <div
            className={
              isSidebarOpen ? styles.openedSidebar : styles.closedSidebar
            }
          >
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="p-6 ">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
