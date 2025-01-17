import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello GPT",
  description: "Generated by Shabbir Poonawala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  );
}
