"use client";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";

export default function Login() {
  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-800 h-screen flex items-center">
      <div className="w-full flex flex-col gap-4 p-5 sm:w-4/5 sm:mx-auto md:flex-row lg:w-2/3 lg:gap-14">
        <div className="w-full bg-login-bg bg-cover p-10 text-white md:py-20 md:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo.png" alt="" />
            <h1 className="text-2xl font-bold">EDU - CRM</h1>
          </div>
          <h2 className="mb-5 pl-3">Admin Dashboard</h2>
          <ul className="pl-3 flex flex-col gap-4 text-sm">
            <li className="flex items-center gap-3">
              <FiberManualRecordIcon className="text-amber-500 text-xs" />
              Lorem ipsum dolor sit amet.
            </li>
            <li className="flex items-center gap-3">
              <FiberManualRecordIcon className="text-amber-500 text-xs" />
              Lorem ipsum dolor sit amet.
            </li>
            <li className="flex items-center gap-3">
              <FiberManualRecordIcon className="text-amber-500 text-xs" />
              Lorem ipsum dolor sit amet.
            </li>
          </ul>
        </div>

        <div className="w-full bg-white px-5 py-8 md:py-20 md:w-1/2">
          <h1 className="text-center text-lg font-bold mb-5 ">Log In</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Login"
              className="border border-gray-400 rounded outline-none p-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded outline-none p-2"
            />
            <div className="flex justify-between">
              <div className="flex gap-2">
                <input type="checkbox" className="w-5 cursor-pointer" />
                <p>Remember me</p>
              </div>
              <Link href="/" className="text-blue-700">
                Porgot password?
              </Link>
            </div>
            <Link
              href="/"
              className="bg-blue-700 text-white w-24 p-2 rounded text-center"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
