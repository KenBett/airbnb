import type { Metadata } from "next";
import {  Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "This is a good airbnb application",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-48 pt-20">
        {children}
        </div>
      </body>
    </html>
  );
}
