import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DynamicMainLayout = dynamic(() => import("@/components/MainLayout"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDU-CRM by Bizler.Group",
  description: "EDU-CRM by Bizler.Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicMainLayout children={children} />
        <ToastContainer position="top-right" theme="light" autoClose={2000} />
      </body>
    </html>
  );
}
