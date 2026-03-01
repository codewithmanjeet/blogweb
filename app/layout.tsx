import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import TopLoader from "./components/TopLoader";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export const metadata = {
  title: "Hunting_Coder73 Blog",
  description: "Personal Blog Website",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
       <Toaster position="top-right" />
        <CustomCursor />
        <SmoothScroll />
        <TopLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}