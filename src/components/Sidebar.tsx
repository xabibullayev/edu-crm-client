import React from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import SchoolIcon from "@mui/icons-material/School";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { usePathname } from "next/navigation";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Function;
  screenWidth: number | undefined;
};

function Sidebar(
  { isSidebarOpen, setIsSidebarOpen, screenWidth }: Props,
  ref: any
) {
  const pathname = usePathname();

  const links = [
    { id: 1, title: "Statistika", url: "/", icon: <DashboardIcon /> },
    { id: 2, title: "Lidler", url: "/lids", icon: <SystemUpdateAltIcon /> },
    { id: 3, title: "Mug'allimler", url: "/teachers", icon: <SchoolIcon /> },
    {
      id: 4,
      title: "Oqiwshilar",
      url: "/students",
      icon: <RecentActorsIcon />,
    },
    { id: 5, title: "Kurslar", url: "/courses", icon: <BurstModeIcon /> },
    { id: 6, title: "Gruppalar", url: "/groups", icon: <GroupIcon /> },
    {
      id: 7,
      title: "Auditoriyalar",
      url: "/auditories",
      icon: <MeetingRoomIcon />,
    },
  ];

  const styles = {
    openedSidebar:
      "w-[280px] bg-slate-800 text-white h-screen fixed left-0 transition-all duration-300 ease",
    closedSidebar:
      "w-[280px] bg-slate-800 text-white h-screen fixed -left-[280px] transition-all duration-300 ease",
  };

  return (
    <div
      ref={ref}
      className={isSidebarOpen ? styles.openedSidebar : styles.closedSidebar}
    >
      <div className="flex items-center gap-4 p-6">
        <img src="/images/logo.png" alt="Logo" />
        <h1 className="text-xl font-medium">EDU - CRM</h1>
      </div>

      <ul className="px-6 flex flex-col gap-4">
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            onClick={() =>
              screenWidth && screenWidth < 1024 && setIsSidebarOpen(false)
            }
            className={`${
              pathname === link.url && "bg-gray-500"
            } w-full hover:bg-gray-600 inline-block p-2 rounded-md`}
          >
            <li className="flex items-center gap-3">
              {link.icon}
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

const forwardRef = React.forwardRef(Sidebar);

export default forwardRef;
