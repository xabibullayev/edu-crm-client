import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Function;
};

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  return (
    <div className="bg-white h-16 p-4 flex items-center justify-between shadow-main">
      <div className="hover:bg-slate-200 rounded-full p-2 cursor-pointer">
        <MenuIcon
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ fontSize: "30px" }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden hover:bg-slate-200 rounded-full p-2 cursor-pointer sm:block">
          <SearchIcon style={{ fontSize: "25px" }} />
        </div>
        <div className="hover:bg-slate-200 rounded-full p-2 cursor-pointer relative">
          <NotificationsIcon style={{ fontSize: "25px" }} />
          <div className="bg-red-500 text-white text-[12px] w-[20px] h-[20px] flex justify-center items-center rounded-full p-1 absolute -right-[1px] -top-[1px]">
            8
          </div>
        </div>

        <Link
          href="/"
          className="bg-slate-100 hover:bg-slate-200 h-12 px-1 rounded-3xl flex items-center"
        >
          <p className="pl-4 mr-3 hidden sm:block">Admin</p>
          <AccountCircleIcon
            style={{ fontSize: "38px" }}
            className="text-slate-400"
          />
        </Link>
      </div>
    </div>
  );
}
