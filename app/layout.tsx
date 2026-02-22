import "./globals.css";
import Navbar from "./components/Navbar";
import TopLoader from "./components/TopLoader";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export const metadata = {
  title: "Hunting_Coder73 Blog",
  description: "Personal Blog Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
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
